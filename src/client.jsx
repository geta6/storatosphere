import 'react-fastclick';
import skrollr from 'skrollr';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import style from './client.styl';
import Logo from './image/logo.png';
import Back from './image/bg.png';
import Elevator from './image/elevator.png';
import People from './image/people.png';
import Lattice from './image/lattice.png';

class App extends PureComponent {
  constructor(props, context) {
    super(props, context);
    style._insertCss();
  }

  componentDidMount = () => {
    skrollr.init();
  };

  render = () => (
    <div id='App'>
      <div id='AppBack' style={{ backgroundImage: `url(${Back})` }}>
        <div id='AppBackElevator' style={{ backgroundImage: `url(${Elevator})` }} data-0='background-position: 50% 40%' data-4000='background-position: 50% 60%' />
        <div id='AppBackLattice' style={{ backgroundImage: `url(${Lattice})` }} />
        <div id='AppBackPeople' style={{ backgroundImage: `url(${People})` }} data-0='background-position: 50% 0%' data-4000='background-position: 50% 80%' />
      </div>
      <div id='AppMenu'>
        <ul id='AppMenuBody'>
          <li><img src={Logo} alt='ストラとスフィア' /></li>
          <li className='AppMenu'>トップ</li>
          <li className='AppMenu'>イントロダクション</li>
          <li className='AppMenu'>ストーリー</li>
          <li className='AppMenu'>キャラクター</li>
          <li className='AppMenu'>テーマソング</li>
        </ul>
      </div>
      <div id='AppCopy'>
        <div className='copy copy1'>宇宙にいちばん</div>
        <div className='copy copy2'>近い場所へ―</div>
      </div>

      <div id='AppMain'>

        <div className='AppSectionSpace' />

        <div className='AppSection AppSectionIntroduction' name='introduction'>
          <h2>イントロダクション</h2>
          <p>同人サークル『瓶底眼鏡女子同盟』が主催するトランス・パーティ『Stratosphere』が、オリジナルビデオアニメーションとして映像化。</p>
          <p>映像を担当するのは、新進気鋭のアニメーションスタジオ、『スタジオ Bin』。</p>
          <p>パーティを象徴する『宇宙にいちばん近い場所へ』をキーフレーズに、ふたりの女の子の運命的な出会いが描かれます。</p>
          <p>メインビジュアル/キャラクターデザインはイラストレーターの葉月ナツ氏が担当。</p>
          <p>またDJ Norikenとstereoberryが紡ぐエモーショナルなテーマソングをYUC'eが歌い上げ、作品の世界観を彩ります。</p>
        </div>

        <div className='AppSectionSpace half' />

        <div className='AppSection AppSectionStory' name='story'>
          <h2>ストーリー</h2>
          <p>西暦2XXX年。人類は軌道エレベーターの開発に成功し、誰でも簡単に宇宙に行ける時代がやってきていた。</p>
          <p>いくつかある軌道エレベーター中継地点のうちのひとつ『ストラトスフィア』が、丁度成層圏の標高に完成した年に生まれた女の子、ストラ。</p>
          <p>彼女はその名の示す通り、『成層圏』以上の高さには昇れないという、この時世において非常に悲しい呪いを抱えて生まれてきたのだった。</p>
          <p>その現実を抱えながら、なお宇宙への憧れを持ってやまないまま、ストラは14歳の春を迎える。</p>
          <p>自分の名前の元となった『ストラトスフィア』へと足繁く通う毎日。体質を呪いこそすれ、ストラはその場所が大好きだった。</p>
          <p>そして4月1日、春休みも終わりが近づく頃、彼女の元に運命的な出会いが訪れる――</p>
        </div>

        <div className='AppSectionSpace half' />

        <div className='AppSection AppSectionCharactor' name='charactor'>
          <h2>キャラクター</h2>
          <h3>ストラ（CV:？？？）</h3>
          <p>巨大軌道エレベーター第3中継地点『ストラトスフィア』が完成した年に生まれた14歳の女の子。</p>
          <p>両親は宇宙開発に従事していて、その流れで自身も宇宙への興味を持つ。</p>
          <p>活発な性格で、興味を持ったものにはどんどんのめり込む。</p>
          <p>それゆえ学校では浮いた存在だが友だちは多い。自分の知識をひけらかしてドヤ顔しがち。</p>
          <h3>スフィア（CV:？？？）</h3>
          <p>4月1日にストラが『ストラトスフィア』で出会う謎の少女。</p>
          <p>ストラに負けず劣らずの宇宙好きで、出会ったばかりとのストラともすぐに仲良くなる。</p>
          <p>つかみどころがなく、どこか消え入りそうな雰囲気を持つ。</p>
          <p>その正体は…………？</p>
        </div>

        <div className='AppSectionSpace half' />

        <div className='AppSection AppSectionSong' name='song'>
          <h2>テーマソング</h2>

          <h3>スターゲイザー</h3>
          <p>作詞：stereoberry</p>
          <p>作曲：DJ Noriken</p>
          <p>Vocal：YUC'e</p>

          <iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/298735147&amp;color=071421&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
          <p>2017春M3 A-14ab 『Binzokomegane Girls Union & Sketch UP! Rec.』にて頒布。</p>
          <p>原曲とInstrumentalの他、Remixを数曲収録！詳細は後日公開。</p>
        </div>

        <div className='AppSectionSpace half' />

        <div className='AppSection AppSectionFooter'>
          <p>2017春M3 A-14ab 『Binzokomegane Girls Union & Sketch UP! Rec.』にて頒布。</p>
          <p>原曲とInstrumentalの他、Remixを数曲収録！詳細は後日公開。</p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('app'));
