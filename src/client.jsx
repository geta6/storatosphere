// import 'react-fastclick';
import classNames from 'classnames';
import skrollr from 'skrollr';
import UAParser from 'ua-parser-js';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import style from './client.styl';
import Logo from './image/logo.png';
import Back from './image/bg.png';
import Elevator from './image/elevator.png';
import People from './image/people.png';
import Lattice from './image/lattice.png';
import Stora from './image/stora.png';
import Sphere from './image/sphere.png';

class App extends PureComponent {
  constructor(props, context) {
    super(props, context);
    style._insertCss();
    this.image = [Logo, Back, Elevator, People, Lattice, Stora, Sphere];
    this.state = { loaded: false, count: 0 };
  }

  componentDidMount = () => {
    this.nodeMask = this.node.querySelector('#AppMask');
    this.nodeElevator = this.node.querySelector('#AppBackElevator');
    this.nodePeople = this.node.querySelector('#AppBackPeople');

    setTimeout(async () => {
      for (const src of this.image) {
        await new Promise((resolve) => {
          Object.assign(new Image(), { src, onload: () => this.setState({ count: this.state.count + 1 }, resolve), onerror: () => this.setState({ count: this.state.count + 1 }, resolve) });
        });
      }

      window.addEventListener('resize', this.handleResize, false);
      this.handleResize();

      this.nodeElevator.setAttribute(`data-${document.body.scrollHeight - window.innerHeight}`, 'background-position: 50% 60%');
      this.nodePeople.setAttribute(`data-${document.body.scrollHeight - window.innerHeight}`, 'background-position: 50% 100%');
      setTimeout(() => {
        const ua = new UAParser();
        if (!['mobile', 'tablet'].includes(ua.getResult().device.type)) {
          this.setState({ mobile: false });
          skrollr.init();
        } else {
          this.setState({ mobile: true });
        }
        this.setState({ loaded: true });
      });
    });
  };

  handleResize = () => {
    this.nodeMask.style.height = `${window.innerHeight}px`;
  };

  handleAssignNode = (node) => {
    this.node = node;
  };

  render = () => (
    <div id='App' ref={this.handleAssignNode} className={classNames({ mobile: this.state.mobile })}>
      <div id='AppLoad' className={classNames({ visible: !this.state.loaded })}>
        <div id='AppLoadBar'>
          <div id='AppLoadBarBody' style={{ width: `${(this.state.count / this.image.length) * 100}%` }} />
          <div className='label'>Loading...</div>
        </div>
      </div>

      <div id='AppMask' />
      <div id='AppBack' style={{ backgroundImage: `url(${Back})` }}>
        <div id='AppBackElevator' style={{ backgroundImage: `url(${Elevator})` }} data-0='background-position: 50% 40%' />
        <div id='AppBackLattice' style={{ backgroundImage: `url(${Lattice})` }} />
        <div id='AppBackPeople' style={{ backgroundImage: `url(${People})` }} data-0='background-position: 50% 0%' />
      </div>

      <div id='AppOverlay'>
        <div id='AppOverlayLogo'>
          <img src={Logo} alt='ストラとスフィア' />
        </div>
        <div id='AppOverlayCopy'>
          <div id='AppOverlayCopyBody'>
            <div className='copy copy1'>宇宙にいちばん</div>
            <div className='copy copy2'>近い場所へ―</div>
          </div>
        </div>
      </div>

      <div id='AppMain'>

        <div id='AppMainBody'>

          <div className='AppSection' name='introduction'>
            <div className='AppSectionBody'>
              <h2>イントロダクション</h2>
              <div className='AppSectionBodyParagraph'>
                <p>同人サークル『瓶底眼鏡女子同盟』が主催するトランス・パーティ『Stratosphere』が、オリジナルビデオアニメーションとして映像化。</p>
                <p>映像を担当するのは、新進気鋭のアニメーションスタジオ、『スタジオ Bin』。</p>
                <p>パーティを象徴する『宇宙にいちばん近い場所へ』をキーフレーズに、ふたりの女の子の運命的な出会いが描かれます。</p>
                <p>メインビジュアル/キャラクターデザインはイラストレーターの葉月ナツ氏が担当。</p>
                <p>またDJ Norikenとstereoberryが紡ぐエモーショナルなテーマソングをYUC'eが歌い上げ、作品の世界観を彩ります。</p>
              </div>
            </div>
          </div>

          <div className='AppSection' name='story'>
            <div className='AppSectionBody'>
              <h2>ストーリー</h2>
              <div className='AppSectionBodyParagraph'>
                <p>西暦2XXX年。人類は軌道エレベーターの開発に成功し、誰でも簡単に宇宙に行ける時代がやってきていた。</p>
                <p>いくつかある軌道エレベーター中継地点のうちのひとつ『ストラトスフィア』が、丁度成層圏の標高に完成した年に生まれた女の子、ストラ。</p>
                <p>彼女はその名の示す通り、『成層圏』以上の高さには昇れないという、この時世において非常に悲しい呪いを抱えて生まれてきたのだった。</p>
                <p>その現実を抱えながら、なお宇宙への憧れを持ってやまないまま、ストラは14歳の春を迎える。</p>
                <p>自分の名前の元となった『ストラトスフィア』へと足繁く通う毎日。体質を呪いこそすれ、ストラはその場所が大好きだった。</p>
                <p>そして4月1日、春休みも終わりが近づく頃、彼女の元に運命的な出会いが訪れる――</p>
              </div>
            </div>
          </div>

          <div className='AppSection' name='charactor'>
            <div className='AppSectionBody'>
              <h2>キャラクター</h2>
              <div className='AppSectionCharactor'>
                <div className='AppSectionCharactors left'>
                  <div className='AppSectionCharactorsText'>
                    <h3>ストラ (CV: ???)</h3>
                    <p>巨大軌道エレベーター第3中継地点『ストラトスフィア』が完成した年に生まれた14歳の女の子。</p>
                    <p>両親は宇宙開発に従事していて、その流れで自身も宇宙への興味を持つ。</p>
                    <p>活発な性格で、興味を持ったものにはどんどんのめり込む。</p>
                    <p>それゆえ学校では浮いた存在だが友だちは多い。自分の知識をひけらかしてドヤ顔しがち。</p>
                  </div>
                  <img src={Stora} alt='ストラ' />
                </div>
                <div className='AppSectionCharactors right'>
                  <div className='AppSectionCharactorsText'>
                    <h3>スフィア (CV: ???)</h3>
                    <p>4月1日にストラが『ストラトスフィア』で出会う謎の少女。</p>
                    <p>ストラに負けず劣らずの宇宙好きで、出会ったばかりとのストラともすぐに仲良くなる。</p>
                    <p>つかみどころがなく、どこか消え入りそうな雰囲気を持つ。</p>
                    <p>その正体は…………？</p>
                  </div>
                  <img src={Sphere} alt='スフィア' />
                </div>
              </div>
            </div>
          </div>

          <div className='AppSection' name='song'>
            <div className='AppSectionBody AppSectionBodySong'>
              <h2>テーマソング</h2>

              <h3>スターゲイザー</h3>
              <p>作詞：stereoberry<br />作編曲：DJ Noriken<br />Vocal：YUC'e</p>

              <iframe width='100%' height='166' scrolling='no' frameBorder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/315229539&amp;color=071421&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false' />

              <p>2017春M3 A-14ab 『Binzokomegane Girls Union & Sketch UP! Rec.』にて頒布</p>
              <p>原曲とInstrumentalの他、Remixを数曲収録！詳細は後日公開</p>
            </div>
          </div>

        </div>

        <div id='AppFooter'>
          <div id='AppFooterBody'>
            <p>©2017 Binzokomegane Girls Union/Stratosphere</p>
            <p>※このアニメ化企画はエイプリルフールのネタであり、『スタジオ Bin』および『ストラとスフィア』は架空の存在です。既存の団体、作品とは一切関係ありません。テーマソングのCDは本当に頒布されます。</p>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('app'));
