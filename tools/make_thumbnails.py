import io,re,json,base64,random,sys,os
ONLY=[x for x in os.environ.get('ONLY','').split(',') if x]  # z. B. ONLY=Schach,Mühle nur diese Spiele neu erzeugen
from pathlib import Path
"""Erzeugt die Vorschaubilder (games/<id>/thumb.webp) aus echten Spielszenen.
Benötigt: pip install playwright pillow && playwright install chromium
Aufruf aus dem Projektordner:  python tools/make_thumbnails.py"""
from playwright.sync_api import sync_playwright
from PIL import Image,ImageChops,ImageDraw,ImageFilter
ROOT=Path(__file__).resolve().parent.parent;URL=(ROOT/'index.html').as_uri();W,H=400,250
def hx(h):return tuple(int(h[i:i+2],16) for i in (1,3,5))
def grad(c1,c2):
    m=Image.linear_gradient('L').resize((W,H)).rotate(35,expand=False,fillcolor=128)
    return Image.composite(Image.new('RGB',(W,H),hx(c2)),Image.new('RGB',(W,H),hx(c1)),m)
def cover(img,oy=.5):
    r=max(W/img.width,H/img.height);im=img.resize((max(W,round(img.width*r)),max(H,round(img.height*r))),Image.LANCZOS)
    l=(im.width-W)//2;t=round((im.height-H)*oy);return im.crop((l,t,l+W,t+H))
def contain(img,c1,c2):
    bgc=Image.new('RGB',img.size,(19,15,38));bb=ImageChops.difference(img.convert('RGB'),bgc).getbbox()
    if bb:img=img.crop(bb)
    r=min(W*.86/img.width,H*.9/img.height);im=img.resize((round(img.width*r),round(img.height*r)),Image.LANCZOS).convert('RGBA')
    bg=grad(c1,c2).convert('RGBA');x=(W-im.width)//2;y=(H-im.height)//2
    sh=Image.new('RGBA',(W,H),(0,0,0,0));ImageDraw.Draw(sh).rounded_rectangle((x+4,y+10,x+im.width+4,y+im.height+10),14,fill=(0,0,0,150));bg=Image.alpha_composite(bg,sh.filter(ImageFilter.GaussianBlur(10)))
    mk=Image.new('L',im.size,0);ImageDraw.Draw(mk).rounded_rectangle((0,0,im.width-1,im.height-1),14,fill=255);bg.paste(im,(x,y),mk);return bg.convert('RGB')
def png(b):return Image.open(io.BytesIO(b)).convert('RGB')
def run():
    out={}
    with sync_playwright() as p:
        br=p.chromium.launch();pg=br.new_page(viewport={'width':1100,'height':950})
        pg.goto(URL);pg.wait_for_timeout(500);META=pg.evaluate('META');IDS=pg.evaluate('Object.fromEntries(GAMES.map(g=>[g.n,g.id]))')
        w=pg.wait_for_timeout
        def open_game(n):
            pg.goto(URL);w(120);pg.locator('#q').fill(n);w(60);pg.locator('#app .gc').first.click();w(80);pg.locator('.start').first.click();w(300)
        def dom():
            a=pg.locator('#app').bounding_box();b=pg.locator('.bar').bounding_box();y=b['y']+b['height']+6
            return png(pg.screenshot(clip={'x':a['x'],'y':y,'width':a['width'],'height':min(a['y']+a['height']-y,800)}))
        cvs=lambda:png(pg.locator('canvas').screenshot())
        def clicks(sel,idx,wt=500):
            for i in idx:pg.locator(sel).nth(i).click();w(wt)
        def box():return pg.locator('canvas').bounding_box()
        def at(cx,cy,W0=400,H0=700):
            b=box();return b['x']+cx/W0*b['width'],b['y']+cy/H0*b['height']
        def drag(a,b2,steps=8):
            pg.mouse.move(*a);pg.mouse.down();pg.mouse.move(*b2,steps=steps);pg.mouse.up()
        def schach():clicks('.sq',[52,36],1500);clicks('.sq',[51,35],1500)
        def muehle():clicks('svg.mu circle',[0,2,4,6,9],1000)
        def vier():clicks('.c4 .col',[3,3,4,2,3],950)
        def reversi():
            for _ in range(3):pg.locator('.rc:has(u)').first.click();w(1200)
        def mancala():
            for _ in range(2):pg.locator('.pit:not(:disabled)').first.click();w(1500)
        def kaest():
            n=pg.locator('.ln').count();random.seed(4)
            for i in random.sample(range(n),9):pg.locator('.ln').nth(i).click();w(750)
        def ttt():clicks('.tc',[4,0,8,2],900)
        def uttt():
            for _ in range(4):
                c=pg.locator('.sb.act .uc').count();pg.locator('.sb.act .uc').nth(random.randrange(c)).click();w(900)
        def galgen():
            for ch in 'EARNST':pg.get_by_role('button',name=ch,exact=True).click();w(120)
        def wuerfel():
            pg.get_by_role('button',name='Würfeln').click();w(300);pg.locator('.dc').nth(0).click();pg.locator('.dc').nth(2).click();pg.get_by_role('button',name='Würfeln').click();w(300)
        def woertle():
            for wd in ('KATZE','STERN','MUSIK'):pg.keyboard.type(wd);pg.keyboard.press('Enter');w(150)
        def tau():
            for i in range(7):pg.locator('.zone').nth(1 if i%3 else 0).click();w(40)
        def hockey():
            pg.mouse.move(*at(90,200,700,400));w(300);pg.mouse.move(*at(230,150,700,400),steps=6);w(900)
        def flatter():
            for _ in range(4):pg.mouse.click(*at(200,350));w(380)
        def bubble():
            for x0 in (300,120):pg.mouse.move(*at(x0,200,400,640));pg.mouse.click(*at(x0,200,400,640));w(1300)
        def block():
            for k,t in ((0,(150,200)),(1,(260,300))):drag(at(70+k*130,480,400,560),at(*t,400,560));w(250)
        def dash():
            pg.keyboard.press('Space');w(800);pg.keyboard.press('Space');w(800);pg.keyboard.press('Space');w(700)
        def spiral():
            b=box();pg.mouse.move(b['x']+b['width']/2,b['y']+300);pg.mouse.down();pg.mouse.move(b['x']+b['width']/2+60,b['y']+300,steps=5);w(700);pg.mouse.move(b['x']+b['width']/2-50,b['y']+300,steps=5);w(500);pg.mouse.up()
        def kak():
            for i in (0,8,17,25,30,3):pg.locator('.kc').nth(i).click();w(80)
            pg.locator('.kc').nth(17).click();w(300)
        def shi():
            b=box();N=5;C=b['width']/N
            for (r0,c0,r1,c1) in ((0,0,1,1),(2,0,4,0),(0,3,3,4)):drag((b['x']+(c0+.5)*C,b['y']+(r0+.5)*C),(b['x']+(c1+.5)*C,b['y']+(r1+.5)*C));w(250)
        def clickc(fx,fy):
            b=box();pg.mouse.click(b['x']+b['width']*fx,b['y']+b['height']*fy)
        def crossy():
            for _ in range(2):clickc(.5,.5);w(220)
            w(100)
        def paper():
            for k in ('ArrowDown','ArrowRight','ArrowUp','ArrowLeft'):pg.keyboard.press(k);w(700)
            w(300)
        def zahlen():
            for k in ('ArrowLeft','ArrowUp','ArrowRight','ArrowDown')*3:pg.keyboard.press(k);w(170)
        def schlange():
            pg.keyboard.press('ArrowRight');w(600);pg.keyboard.press('ArrowDown');w(500);pg.keyboard.press('ArrowRight');w(300)
        def minen():pg.locator('.mc').nth(40).click();w(300)
        def tetris():
            clickc(.4,.5);w(300)
            for a,b2 in (('ArrowLeft','Space'),('ArrowRight','Space'),('ArrowUp','Space'),('ArrowLeft','ArrowLeft')):
                pg.keyboard.press(a);pg.keyboard.press(b2);w(250)
        def stein():clickc(.5,.8);w(900);pg.mouse.move(*at(150,520,400,560));w(300)
        def turm():
            for _ in range(5):clickc(.5,.5);w(620)
        def schieb():
            for i in (7,5,4):pg.locator('.st2').nth(i).click();w(200)
        def flut():
            for i in (2,4,1):pg.locator('.pc2').nth(i).click();w(120)
        def licht():
            for i in (3,7,12):pg.locator('.lt').nth(i).click();w(120)
        def folge():w(1500)
        spec={'Schach':('d',schach),'Mühle':('d',muehle),'Vier in einer Reihe':('d',vier),'Reversi':('d',reversi),'Mancala':('d',mancala),'Kästchen':('d',kaest),'Tic-Tac-Toe':('d',ttt),'Ultimate Tic-Tac-Toe':('d',uttt),
        'Paare finden':('d',lambda:clicks('.card',[0,1],60)),'Flaggen-Quiz':('d',lambda:w(200)),'Galgenmännchen':('d',galgen),'Würfelkönig':('d',wuerfel),'Wörtle':('d',woertle),
        'Tap-Duell':('d',lambda:w(900)),'Tauziehen':('d',tau),'Kaktoku':('d',kak),'Shikaku':('cc',shi),
        'Air Hockey':('cc',hockey),'Flatterflug':('cc',flatter),'Blasenschuss':('c',bubble,.3),'Block-Blitz':('cc',block),'Neon-Dash':('c',dash,.6),'Spiral-Sprung':('c',spiral,.35),'Straßenhüpfer':('cc',crossy),'Farbland':('cc',paper),'Zahlenfusion':('d',zahlen),'Schlangenjagd':('cc',schlange),'Minenfeld':('d',minen),'Blockfall':('cc',tetris),'Steinbrecher':('c',stein,.2),'Turmbau':('cc',turm),'Schiebepuzzle':('d',schieb),'Farbflut':('d',flut),'Lichter aus':('d',licht),'Farbfolge':('d',folge)}
        for n,s in spec.items():
            if ONLY and n not in ONLY:continue
            open_game(n);s[1]()
            c1,c2=META[n][1],META[n][2]
            im=dom() if s[0]=='d' else cvs()
            th=contain(im,c1,c2) if s[0] in('d','cc') and n not in('Tap-Duell','Tauziehen') else cover(im,s[2] if len(s)>2 else .5)
            if n in('Tap-Duell','Tauziehen'):th=cover(im,.5)
            th.save(ROOT/'games'/IDS[n]/'thumb.webp','WEBP',quality=76,method=6);out[n]=1;print(n,'->',IDS[n]+'/thumb.webp')
        br.close()
    return out
out=run();print('fertig',len(out))
