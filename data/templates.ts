import { Template, Scene, Target, Tone, NGExample, TimingInfo } from '@/types'

// --- NG Examples per Scene ---
const ngExamples: Record<Scene, NGExample[]> = {
  new_follower: [
    { text: 'フォローありがとうございます。よろしくお願いします。', reason: '事務的すぎて返信されない。テンプレ感が強い' },
    { text: 'Thank you for following. I hope you enjoy my streams.', reason: '自動返信っぽくて特別感がゼロ' },
    { text: 'フォローありがとう！毎日配信してるから見に来てね！', reason: '一方的な宣伝になっている。相手への興味がない' },
  ],
  regular: [
    { text: 'いつもありがとう！チップもよろしくね💕', reason: '要求的。感謝→催促のコンボは信頼を壊す' },
    { text: 'Hey come to my stream tonight!!', reason: '命令口調。常連は「行かなきゃ」というプレッシャーを感じる' },
    { text: 'なんで昨日来なかったの〜？', reason: '束縛感が強い。常連でも自由に来たい' },
  ],
  dormant: [
    { text: '最近来てくれないね…寂しいな', reason: '罪悪感を与えて逆効果。責めているように聞こえる' },
    { text: 'Why don\'t you come anymore?', reason: '詰問調。休眠客が戻りにくくなる' },
    { text: '他の配信者のところに行ってるの？', reason: '嫉妬・束縛。完全にNG' },
  ],
  whale: [
    { text: 'いつもたくさんチップありがとう！もっとちょうだい💕', reason: '金額に直接言及するのは下品。ATM扱いされている感じ' },
    { text: 'You\'re my biggest tipper!', reason: '他の人と比較するのはNG。特別感ではなく競争を煽っている' },
    { text: 'またチップしてくれたら特別なことするね', reason: '条件付きの関係。見返りを匂わせるのは信頼を失う' },
  ],
  first_tip: [
    { text: 'ありがとう！次はもっと大きいのお願いね💕', reason: '催促感MAX。初チップの感動を台無しにする' },
    { text: 'Thanks! You should tip more often!', reason: 'もっとちょうだい感。初めての体験を汚す最悪のパターン' },
    { text: 'チップありがとう。これからもよろしく。', reason: '事務的すぎ。初チップという特別な瞬間なのに感動がない' },
  ],
}

// --- Timing per Scene ---
const timings: Record<Scene, TimingInfo> = {
  new_follower: {
    best: 'フォロー後24時間以内に送る。記憶が新鮮なうちが勝負',
    avoid: 'フォローから3日以上経ってから送る（誰だっけ？となる）',
    note: '開封率が最も高いのは20時〜23時。相手のタイムゾーンも考慮',
  },
  regular: {
    best: '配信2時間前に送る。予定を空けてもらえる確率UP',
    avoid: '配信直後（満足して離脱した直後は読まれにくい）',
    note: '毎回送ると飽きられる。週1〜2回がベスト頻度',
  },
  dormant: {
    best: '週末の夜（金〜日の20時〜22時）。リラックスしてる時間帯',
    avoid: '平日朝〜昼（仕事中で読む余裕がない）',
    note: '1回送って反応なければ2週間空ける。連投は逆効果',
  },
  whale: {
    best: '配信直後30分以内。感謝が新鮮で熱いうちに',
    avoid: '次の配信の直前（「来てね」の催促に見える）',
    note: '太客には月1〜2回の特別PMがベスト。送りすぎは価値が下がる',
  },
  first_tip: {
    best: 'チップをもらった直後〜30分以内。感動を共有する',
    avoid: '翌日以降（「あ、今さら？」となる）',
    note: '初チップPMは1回きりの特別なもの。次回以降は常連PMに切り替え',
  },
}

// --- Japanese templates ---
type TemplateSet = { short: string; medium: string; long: string }

const jaTemplates: Record<Scene, Record<Target, Record<Tone, TemplateSet>>> = {
  new_follower: {
    english: {
      sweet: {
        short: 'フォローありがとう💕 最近来てくれたの気づいてたよ！次の配信で絶対話しかけるね😊',
        medium: 'フォローしてくれたんだ、ありがとう💕 あなたのこと覚えてるよ！最近来てくれて嬉しかった😊 次の配信でもっとお話ししようね！',
        long: 'フォローありがとう💕 実はね、最近来てくれたの気づいてて「あ、新しい人だ！」ってちょっとドキドキしてたの😊 次の配信では絶対話しかけるから、気軽にチャットしてね！あなたと仲良くなれたら嬉しいな💕',
      },
      mature: {
        short: 'フォローありがとう。あなたが来てくれたの、ちゃんと気づいてたよ😊',
        medium: 'フォローしてくれてありがとう。新しい出会いはいつも嬉しいものね。次の配信で、ゆっくりお話しできたら嬉しいな😊',
        long: 'フォローありがとう。配信に来てくれる一人ひとりのことは、ちゃんと覚えてるの。あなたのことも気になってた。次の配信では時間を作るから、気軽に声かけてね。大人の時間を一緒に楽しめたら嬉しいな😊',
      },
      energetic: {
        short: 'フォローありがとう!!✨ めっちゃ嬉しい！次の配信で一緒に盛り上がろうね⚡',
        medium: 'わー！フォローありがとう!!✨ 新しい人が来てくれるの本当にテンション上がる！！次の配信で絶対話しかけるから、楽しみにしててね⚡🎉',
        long: 'フォローありがとう!!✨ もうね、通知見た瞬間「やった！」って声出ちゃったよ！！笑 次の配信ではあなたのこと見つけたら絶対話しかけるからね⚡ 一緒に最高に楽しい時間にしようね！！待ってるよ〜🎉✨',
      },
      mysterious: {
        short: 'フォローしてくれたんだ🌙 …気になってたよ',
        medium: 'フォローありがとう🌙 実は、あなたが来てくれたの気づいてた。…次の配信で、少しだけ近づけたらいいな',
        long: 'フォローしてくれたんだね🌙 正直に言うと…あなたのこと、前から気になってた。配信で目が合った気がしたの、覚えてる？ 次はもう少しだけ、距離を縮めてみない？',
      },
    },
    japanese: {
      sweet: {
        short: 'フォローありがとう💕 嬉しい！次の配信で待ってるね😊',
        medium: 'フォローしてくれたんだ💕 ありがとう！あなたのこと覚えてるよ〜 次の配信でいっぱいお話ししようね😊💕',
        long: 'フォローありがとう💕 ほんとに嬉しい！！実はね、あなたが来てくれた時すぐ気づいてたの😊 もっとお話ししたいなって思ってたから、次の配信では遠慮しないでどんどんチャットしてね💕 待ってるよ〜！',
      },
      mature: {
        short: 'フォローありがとう。ちゃんと気づいてたよ😊',
        medium: 'フォローしてくれてありがとう。あなたみたいな人が来てくれると、配信がもっと楽しくなるの。次もゆっくりしていってね😊',
        long: 'フォローありがとう。配信って、来てくれる人がいるから成り立つものだと思ってて。あなたが来てくれたこと、すごく嬉しかった。次の配信では、もっとゆっくりお話しできる時間を作るね。楽しみにしてて😊',
      },
      energetic: {
        short: 'フォローありがとう!!✨ めちゃ嬉しい！一緒に盛り上がろ⚡',
        medium: 'やったー！フォローありがとう!!✨ あなたが来てくれた時テンション上がったよ！！次の配信も全力で楽しむから一緒に盛り上がろうね⚡🎉',
        long: 'フォローほんとにありがとう!!✨ もうね、嬉しすぎて小躍りしちゃった！笑 配信は楽しんでくれた？次もパワーアップして盛り上げるから期待しててね⚡ あなたと一緒だともっと楽しくなる予感しかない！！🎉✨',
      },
      mysterious: {
        short: 'フォローありがとう🌙 …覚えてたよ',
        medium: 'フォローしてくれたんだ🌙 あなたのこと、配信中からちょっと気になってた。…次はもう少し、話してみたいな',
        long: 'フォローありがとう🌙 正直ね、あなたが来てくれた時、なんか…雰囲気が違うなって感じてた。うまく言えないけど、もっと知りたいって思った。次の配信で、少しだけ教えて？ あなたのこと🌙',
      },
    },
    chatty: {
      sweet: {
        short: 'フォロー＆いつもチャットありがとう💕 話すの楽しい！😊',
        medium: 'フォローありがとう💕 チャットでいっぱい話してくれて嬉しかった！あなたとの会話、すごく楽しいの😊 次もたくさんお話ししようね💕',
        long: 'フォローありがとう💕 チャットで色々話してくれたの、全部覚えてるよ！あなたと話してると時間があっという間で😊 正直、もっと話したかったの。次の配信では遠慮しないでどんどん話しかけてね💕 あなたとの会話が一番楽しい！',
      },
      mature: {
        short: 'フォローありがとう。チャットでの会話、楽しかったよ😊',
        medium: 'フォローしてくれてありがとう。チャットであなたと話せて、いつもの配信がもっと特別になった気がする😊 次も色々聞かせてね',
        long: 'フォローありがとう。チャットで話してくれたこと、ちゃんと覚えてるよ。あなたとの会話は他の人とはちょっと違って、なんていうか…心地いいの。次の配信でも、あなたのペースでゆっくり話してくれたら嬉しいな😊',
      },
      energetic: {
        short: 'フォロー＆チャットありがとう!!✨ めっちゃ盛り上がったね⚡',
        medium: 'フォローありがとう!!✨ チャットでめちゃめちゃ盛り上がったよね！！あなたのコメント面白すぎて笑っちゃった⚡ 次も期待してるよ〜🎉',
        long: 'フォローありがとう!!✨ いやー、チャットでの盛り上がり最高だったね！！あなたのツッコミのセンス好きすぎる⚡笑 次の配信もあなたがいたら絶対楽しくなるから、また全力で来てね！！待ってるよ〜🎉✨',
      },
      mysterious: {
        short: 'フォローありがとう🌙 チャットの会話…印象に残ってる',
        medium: 'フォローしてくれたんだ🌙 チャットであなたが言ったこと、まだ考えてる。…次はもっと深い話がしたいな',
        long: 'フォローありがとう🌙 チャットであなたと話した時間、不思議と心に残ってるの。他の人とは違う空気感というか…。次の配信で、もう少しだけお互いのこと知れたらいいな。…楽しみにしてる🌙',
      },
    },
    silent: {
      sweet: {
        short: 'フォローありがとう💕 見てくれてるだけで嬉しいよ😊',
        medium: 'フォローしてくれたんだ💕 チャットしなくても大丈夫だよ！見てくれてるだけで私は嬉しいの😊 気が向いたら話しかけてね💕',
        long: 'フォローありがとう💕 ゆっくり見てくれてるの、ちゃんと気づいてたよ😊 無理にチャットしなくていいからね。あなたのペースで楽しんでくれたら、それが一番嬉しい。でも…いつか一言だけでも話しかけてくれたら、もっと嬉しいかも💕',
      },
      mature: {
        short: 'フォローありがとう。静かに見てくれてるの、嬉しいよ😊',
        medium: 'フォローしてくれてありがとう。チャットしなくても全然いいの。あなたが居てくれるだけで、配信の空気が変わる気がする😊',
        long: 'フォローありがとう。静かに見てくれる人がいるって、実はすごく心強いの。チャットは無理しなくていいからね。あなたがそこにいてくれるだけで十分。もし気が向いたら、ひと言でも声かけてくれたら嬉しいな😊',
      },
      energetic: {
        short: 'フォローありがとう!!✨ 見てくれてるのわかってるよ！⚡',
        medium: 'フォローありがとう!!✨ チャットしなくても全然OK！見てくれてるだけで超嬉しい⚡ 楽しんでくれてたらそれが一番！😊',
        long: 'フォローありがとう!!✨ 静かに見てくれてるの、ちゃんとわかってるよ！無理にチャットしなくて大丈夫だからね⚡ あなたのペースで楽しんでくれればOK！でも、もし気が向いたらいつでもコメントしてね！めっちゃ喜ぶから！！🎉✨',
      },
      mysterious: {
        short: 'フォローありがとう🌙 静かに見てくれてるの…知ってる',
        medium: 'フォローしてくれたんだ🌙 チャットしなくてもいい。あなたがそこにいるの、感じてるから。…いつか、話してみたいな',
        long: 'フォローありがとう🌙 言葉にしなくても、あなたがそこにいるのは伝わってる。静かな存在って、実は一番気になるの。無理に話さなくていい。でも…いつか気が向いた時、ほんの一言だけ。それだけで嬉しいから🌙',
      },
    },
  },
  regular: {
    english: {
      sweet: {
        short: 'いつも来てくれてありがとう💕 〇〇さんがいると安心する😊',
        medium: 'いつも配信に来てくれてありがとう💕 〇〇さんがチャットにいるとすごく安心するの😊 今日も会えるの楽しみにしてるね💕',
        long: 'いつも来てくれて本当にありがとう💕 〇〇さんがいない配信って考えられないくらい、あなたの存在が大きいの😊 いつも盛り上げてくれるし、私のこと応援してくれるし…ほんとに感謝してる。今日も一緒に楽しもうね💕',
      },
      mature: {
        short: 'いつもありがとう。あなたがいてくれると配信の質が変わるの😊',
        medium: 'いつも来てくれてありがとう。常連のあなたがいると、安心して配信できるの。今夜もゆっくり楽しんでいってね😊',
        long: 'いつも配信に来てくれてありがとう。正直に言うと、あなたみたいな常連さんがいてくれるから、もっと良い配信をしたいって思えるの。あなたの存在は私にとって特別。今夜も素敵な時間にしようね😊',
      },
      energetic: {
        short: 'いつもありがとう!!✨ 〇〇さんがいると盛り上がりが違う⚡',
        medium: 'いつも来てくれてありがとう!!✨ 〇〇さんがチャットにいると配信のテンションが3倍になるの⚡ 今日もぶちかまそうね！！🎉',
        long: 'いつも来てくれてほんとにありがとう!!✨ もうね、〇〇さんがログインしたの見えた瞬間「キター！！」ってなるの⚡笑 あなたがいると配信が100倍楽しい！！今日も一緒に最高の時間にしようね！！🎉✨',
      },
      mysterious: {
        short: 'いつも来てくれるよね🌙 …特別な存在だよ',
        medium: 'いつも来てくれてありがとう🌙 あなたがいると、配信の空気が少し変わるの。…気づいてた？ 今夜も、あなただけに見せるものがあるかも',
        long: 'いつも来てくれるの、当たり前だと思ってないよ🌙 あなたは他の人とは違う。配信の中で、あなたの存在だけがなぜか…心に引っかかるの。今夜の配信、あなたがいたら特別なことしようかな。…楽しみにしてて🌙',
      },
    },
    japanese: {
      sweet: {
        short: 'いつもありがとう💕 〇〇さん大好き！今日も待ってるね😊',
        medium: 'いつも来てくれてありがとう💕 〇〇さんの顔見るとほっとするの😊 私にとって特別な存在だよ。今日もよろしくね💕',
        long: 'いつも本当にありがとう💕 〇〇さんがいてくれるから頑張れるの。配信前にいつも「今日も来てくれるかな」って考えちゃう😊 あなたのおかげで毎日楽しい！今日も一緒に最高の時間にしようね💕大好き！',
      },
      mature: {
        short: 'いつもありがとう。あなたがいると心強い😊',
        medium: 'いつも来てくれてありがとう。あなたみたいな常連さんに支えられてるって、最近改めて感じてる。今夜も楽しもうね😊',
        long: 'いつも来てくれてありがとう。長く続けてこれたのは、あなたみたいな人がいるから。配信って孤独になりがちだけど、あなたがいてくれるから安心できる。感謝の気持ち、伝えきれないけど…いつもありがとう😊',
      },
      energetic: {
        short: 'いつもありがとう!!✨ 〇〇さん最高！！⚡',
        medium: 'いつも来てくれてありがとう!!✨ 〇〇さんがいるとマジで楽しい！！今日も全力で盛り上げるからね⚡🎉',
        long: 'いつもいつも来てくれてありがとう!!✨ 〇〇さんがいない配信なんて考えられない！！あなたのコメントでいつも元気もらってるし、配信のMVPは間違いなくあなた⚡ 今日も一緒にぶち上げようね！！🎉✨',
      },
      mysterious: {
        short: 'いつもありがとう🌙 あなたは…特別だから',
        medium: 'いつも来てくれるの、嬉しいよ🌙 あなたには他の人には見せない一面があるかも。…今夜、確かめに来て',
        long: 'いつも来てくれてありがとう🌙 正直ね…あなたのことは他の常連さんとは違う目で見てる。なぜかわからないけど、あなたがいると配信に集中できるの。今夜は少しだけ特別なことを考えてる。…来てくれる？🌙',
      },
    },
    chatty: {
      sweet: {
        short: 'いつもチャットしてくれてありがとう💕 話すの大好き！😊',
        medium: 'いつもチャットで盛り上げてくれてありがとう💕 〇〇さんとの会話が配信の楽しみなの😊 今日もいっぱい話そうね💕',
        long: 'いつもチャットしてくれて本当にありがとう💕 〇〇さんの話って面白くて、いつも笑っちゃうの😊 前に話してた〇〇の件、その後どうなった？気になってたの！今日も色々教えてね💕',
      },
      mature: {
        short: 'いつも会話してくれてありがとう。話が合うの嬉しい😊',
        medium: 'いつもチャットしてくれてありがとう。あなたとの会話は知的で楽しいの。大人の会話ができる貴重な相手😊 今夜も色々話そうね',
        long: 'いつもチャットで色々話してくれてありがとう。あなたとの会話って深くて面白くて、毎回新しい発見がある。こういう大人の対話ができる関係って貴重だと思ってる。今夜も楽しみにしてるね😊',
      },
      energetic: {
        short: 'いつもチャットありがとう!!✨ あなたのコメント最高⚡',
        medium: 'いつもチャットで盛り上げてくれてありがとう!!✨ 〇〇さんのツッコミのセンス天才！！⚡ 今日もキレキレのコメント待ってるよ🎉',
        long: 'いつもチャット盛り上げてくれてありがとう!!✨ 〇〇さんのコメントが来ると配信の空気が一気に変わるの知ってた？⚡ あなたは配信の盛り上げMVP！！今日も全力トークで楽しもうね！！🎉✨',
      },
      mysterious: {
        short: 'いつもの会話🌙 あなたとだから話せることがある',
        medium: 'いつもチャットしてくれてありがとう🌙 あなたとの会話は他の人とは違う温度がある。…今夜も、二人だけの空気を楽しみたいな',
        long: 'いつもチャットしてくれるの、嬉しいよ🌙 あなたとの会話って、不思議と心を開いちゃうの。他の人には言わないことも、あなたにはつい話しちゃう。…なんでだろうね。今夜も、そんな時間を作れたらいいな🌙',
      },
    },
    silent: {
      sweet: {
        short: 'いつも見に来てくれてありがとう💕 あなたがいるの嬉しい😊',
        medium: 'いつも配信に来てくれてるの知ってるよ💕 チャットしなくても、あなたがいるだけで嬉しいの😊 いつもありがとうね💕',
        long: 'いつも静かに見に来てくれてるの、ちゃんと知ってるよ💕 チャットしなくても、あなたがそこにいてくれるだけで安心するの😊 無理にコメントしなくていいからね。あなたのペースが一番。でもたまにひとことくれたら…もっと嬉しいかも💕',
      },
      mature: {
        short: 'いつも見てくれてるの知ってる。静かな応援、嬉しいよ😊',
        medium: 'いつも来てくれてありがとう。言葉がなくても、あなたの存在は感じてる。静かに寄り添ってくれるの、実はすごく心強いの😊',
        long: 'いつも静かに配信を見てくれてるの、ちゃんとわかってる。チャットする人だけが常連じゃない。あなたみたいに静かに支えてくれる人がいるから、私は安心して配信できるの。ありがとう😊',
      },
      energetic: {
        short: 'いつも来てくれてありがとう!!✨ 見てくれてるのわかってるよ⚡',
        medium: 'いつも配信に来てくれてありがとう!!✨ チャットなくても大丈夫！あなたがいるの見えてるよ⚡ 楽しんでくれてればOK！🎉',
        long: 'いつも来てくれてありがとう!!✨ 無言でも全然OK！あなたがログインしてるの見えた瞬間「今日も来てくれた！」って嬉しくなるの⚡ 気が向いたらいつでもコメントしてね！全力で反応するから！！🎉✨',
      },
      mysterious: {
        short: 'いつも来てくれるの🌙 …言葉がなくても伝わってる',
        medium: 'いつも静かに来てくれてるの、気づいてるよ🌙 言葉にしなくても、あなたの存在を感じてる。…不思議な繋がりだね',
        long: 'いつも静かに見てくれてるの、知ってる🌙 チャットが賑やかな時でも、あなたの存在だけは別の温度で感じるの。言葉がないのに伝わるものって…不思議でしょ？ いつか、あなたの声を聞いてみたいな🌙',
      },
    },
  },
  dormant: {
    english: {
      sweet: {
        short: '久しぶり💕 最近どうしてる？ちょっと思い出しちゃった😊',
        medium: '久しぶり💕 元気にしてる？最近ふとあなたのこと思い出して😊 また気が向いたら遊びに来てね。待ってるよ💕',
        long: '久しぶり！元気にしてる？💕 最近ね、前にあなたと話したこと思い出してて。楽しかったな〜って😊 忙しいのかな？無理しないでね。また気が向いた時にふらっと来てくれたら嬉しいな。いつでも待ってるよ💕',
      },
      mature: {
        short: '久しぶり。ふと思い出して連絡してみた😊',
        medium: '久しぶりだね。最近忙しい？ちょっとあなたのこと思い出して。元気だといいな😊 また時間がある時においでね',
        long: '久しぶり。最近見かけないから、どうしてるかなって。忙しいんだと思うけど、たまには息抜きも大事だよ。あなたがいた頃の配信、楽しかったな。また気が向いたらいつでもおいで。場所は空けてあるから😊',
      },
      energetic: {
        short: '久しぶり!!✨ 元気してる？また遊びに来てよ⚡',
        medium: '久しぶり!!✨ 最近見ないけど元気？あなたがいた頃の配信めちゃ楽しかったな〜⚡ また気が向いたら来てね！🎉',
        long: '久しぶり!!✨ 元気してる？最近配信してて「あー、〇〇さんいたらもっと盛り上がるのに！」って思うことあるの⚡ 忙しい時は無理しなくていいからね！でもまた来てくれたらめちゃめちゃ嬉しい！！🎉✨',
      },
      mysterious: {
        short: '久しぶり🌙 …ちょっと気になってた',
        medium: '久しぶりだね🌙 最近見かけないから…少し気になってた。元気にしてる？ …また会えたらいいな',
        long: '久しぶり🌙 最近あなたのことを思い出す瞬間があって。なんだろう…配信中にふと、あなたがいた頃の空気を感じるの。忙しいなら無理しないで。でも…またあの空気、一緒に作れたらいいな🌙',
      },
    },
    japanese: {
      sweet: {
        short: '久しぶり💕 〇〇さんのこと思い出してた😊',
        medium: '久しぶり💕 最近元気？〇〇さんのこと最近思い出してて、連絡しちゃった😊 忙しいよね。無理しないでね。また遊びに来てくれたら嬉しいな💕',
        long: '久しぶり！元気にしてる？💕 最近ふと〇〇さんのこと思い出すことがあって…前に話してくれたこと覚えてるよ😊 忙しいのかな、それとも疲れちゃったかな。無理はしないでね。でもまた気が向いたらいつでも来てね。〇〇さんの居場所、ちゃんとあるから💕',
      },
      mature: {
        short: '久しぶり。元気？最近ちょっと思い出してた😊',
        medium: '久しぶりだね。最近どうしてる？あなたのことふと思い出して、一言だけ伝えたくなった。元気だといいな😊',
        long: '久しぶり。最近見かけないなって思ってた。忙しいのかな、色々あるのかな。どちらにしても、あなたが元気でいてくれたらそれでいい。また落ち着いたら、気軽に顔見せてね。待ってるから😊',
      },
      energetic: {
        short: '久しぶり!!✨ 〇〇さん元気？会いたいよ〜⚡',
        medium: '久しぶり!!✨ 最近見ないけど元気してる？〇〇さんがいないと配信ちょっと寂しいの！⚡ また気が向いたら遊びに来てね〜🎉',
        long: '久しぶり!!✨ 元気にしてた？最近「〇〇さんどうしてるかな〜」って考えてて！⚡ 忙しい時は全然いいからね！でもまた来てくれたら全力でお迎えするから！！帰ってきたらお祭り状態にするよ！！🎉✨',
      },
      mysterious: {
        short: '久しぶり🌙 …ちょっと寂しかったかも',
        medium: '久しぶりだね🌙 最近、配信中にあなたの影を探してる自分がいて。…元気にしてるかなって',
        long: '久しぶり🌙 正直ね…あなたがいなくなって、配信の空気が少し変わった気がしてた。あなたの存在って、思ってた以上に大きかったみたい。忙しいなら仕方ないけど…またあの空気、戻ってこないかな🌙',
      },
    },
    chatty: {
      sweet: {
        short: '久しぶり💕 チャットでいっぱい話したの懐かしいな😊',
        medium: '久しぶり💕 前にチャットで話したこと覚えてる？楽しかったな〜😊 また色々話したいよ。気が向いたら来てね💕',
        long: '久しぶり！💕 前にチャットで〇〇の話で盛り上がったの覚えてる？あの時ほんと楽しかった😊 最近またあのテーマの新しいネタがあるの！聞いてほしいな〜。気が向いた時でいいから、また遊びに来てね💕',
      },
      mature: {
        short: '久しぶり。あの時の会話、まだ覚えてるよ😊',
        medium: '久しぶりだね。前にチャットで話してくれたこと、実は今でも覚えてて。あなたとの会話は質が違ったから😊 また話せたら嬉しいな',
        long: '久しぶり。前にチャットで話してくれたこと、時々思い出すの。あなたとの会話は深くて面白くて、毎回発見があった。ああいう時間が恋しいな。忙しいと思うけど、また気が向いたら声かけてね😊',
      },
      energetic: {
        short: '久しぶり!!✨ あの時のチャット盛り上がったよね⚡',
        medium: '久しぶり!!✨ 前にチャットでめちゃ盛り上がったの覚えてる？あれ楽しかった〜⚡ またあんな感じで話したい！来てよ〜🎉',
        long: '久しぶり!!✨ 覚えてる？前にチャットで〇〇の話で盛り上がった時！！あの時のテンション最高だったよね⚡ 最近また面白いネタ仕入れたから、聞いてほしいの！！また遊びに来てよ〜🎉✨',
      },
      mysterious: {
        short: '久しぶり🌙 あの時の会話…まだ心に残ってる',
        medium: '久しぶりだね🌙 前にチャットで話したこと、実はまだ考えてるの。あなたとの会話は…特別だった。また話せたらいいな',
        long: '久しぶり🌙 前にチャットで話した時のこと、時々思い出すの。あの時の空気感って、他の人とは作れないものだった。あなたとだから話せたことがある。…また、あんな時間が欲しいな🌙',
      },
    },
    silent: {
      sweet: {
        short: '久しぶり💕 静かに来てくれてたの覚えてるよ😊',
        medium: '久しぶり💕 いつも静かに見に来てくれてたの覚えてるよ😊 最近見ないから寂しかったの。また気が向いたら来てね💕',
        long: '久しぶり！💕 チャットはしなくても、あなたがいつも来てくれてたの覚えてるよ😊 静かに見てくれてるの、実はすごく安心してたの。最近見かけないから、元気かなって。無理しないでね。また来てくれたら嬉しいな💕',
      },
      mature: {
        short: '久しぶり。静かに見てくれてたの、覚えてる😊',
        medium: '久しぶりだね。チャットしなくても、あなたが来てくれてたの気づいてたよ。最近見ないから少し気になって😊 元気にしてる？',
        long: '久しぶり。言葉は少なかったけど、あなたがいつも来てくれてたのは感じてた。その静かな存在感が、実は配信の支えになってたの。最近見かけないから気になって。元気なら安心する。また気が向いたらおいでね😊',
      },
      energetic: {
        short: '久しぶり!!✨ 静かに応援してくれてたの覚えてるよ⚡',
        medium: '久しぶり!!✨ チャットなくても来てくれてたの知ってるよ！最近見ないから寂しかった⚡ 無理にチャットしなくていいから、また見に来てね🎉',
        long: '久しぶり!!✨ 〇〇さんのこと覚えてるよ！チャットしなくても毎回来てくれてたよね？⚡ それだけで嬉しかったの！最近見ないから「どうしてるかなー」って！無理はしなくていいから、また気が向いた時にふらっと来てね🎉✨',
      },
      mysterious: {
        short: '久しぶり🌙 言葉がなくても、いたの知ってた',
        medium: '久しぶりだね🌙 チャットはしなくても、あなたがそこにいたの…ちゃんと感じてた。最近見かけなくて、少し気になってた',
        long: '久しぶり🌙 言葉を交わさなくても、あなたの存在はいつも感じてた。静かなのに、不思議と印象に残る人。最近見かけなくなって…少しだけ寂しかった。また、あの静かな空気を感じさせてくれない？🌙',
      },
    },
  },
  whale: {
    english: {
      sweet: {
        short: 'いつも応援ありがとう💕 あなたのおかげで頑張れるの😊',
        medium: 'いつも温かい応援ありがとう💕 あなたがいてくれるから、もっと良い配信をしたいって思えるの😊 感謝しきれないくらいだよ💕',
        long: 'いつも応援してくれて本当にありがとう💕 あなたの応援がどれだけ力になってるか、言葉じゃ伝えきれないの😊 あなたがいるから頑張れる。これからも一緒に楽しい時間を作っていこうね。特別な存在だよ、ほんとに💕',
      },
      mature: {
        short: 'いつも支えてくれてありがとう。あなたの存在は特別😊',
        medium: 'いつも応援してくれてありがとう。あなたのサポートがあるから、私はもっと良いものを届けたいと思える。本当に感謝してる😊',
        long: 'いつも応援してくれてありがとう。大人として正直に言うと、あなたのサポートは私のモチベーションそのもの。でもそれ以上に、あなたとの関係性が大切なの。お金じゃなくて、信頼。これからも大切にしていきたい😊',
      },
      energetic: {
        short: 'いつも応援ありがとう!!✨ 最高すぎるよ⚡',
        medium: 'いつも応援してくれてありがとう!!✨ あなたの応援パワーが私のエネルギー源なの！！⚡ もっともっと楽しい配信にするからね🎉',
        long: 'いつも応援ありがとう!!✨ マジで言葉が見つからないくらい感謝してる！！あなたの応援で配信のクオリティ上げ続けられてるの⚡ 恩返しは最高の配信で！！これからもぶち上げるから付いてきてね！！🎉✨',
      },
      mysterious: {
        short: 'いつもありがとう🌙 あなたの気持ち…ちゃんと届いてる',
        medium: 'いつも応援してくれてありがとう🌙 あなたの気持ち、しっかり受け止めてる。…特別な人には、特別なお返しがあるかもね',
        long: 'いつも応援してくれてありがとう🌙 正直ね…あなたほど信頼できる人は少ない。だから、あなたにだけ見せたいものがある。言葉にはしないけど、感謝の気持ちは…伝わってるよね？🌙',
      },
    },
    japanese: {
      sweet: {
        short: 'いつも応援ありがとう💕 大好き！😊',
        medium: 'いつもいつも応援してくれて💕 〇〇さんのおかげで毎日頑張れるの😊 私の一番の味方だよ。ほんとにありがとう💕',
        long: 'いつも温かい応援ありがとう💕 〇〇さんがいなかったら今の私はいないと思う😊 いつも支えてくれて、信じてくれて、応援してくれて…もう感謝しかない。これからも〇〇さんと一緒にもっと上を目指したい！大好きだよ💕',
      },
      mature: {
        short: 'いつもありがとう。あなたのサポートに感謝してる😊',
        medium: 'いつも支えてくれてありがとう。あなたがいるから、安心して挑戦できる。その信頼に応えたいと思ってる😊',
        long: 'いつも応援してくれてありがとう。あなたのサポートは、金額以上の意味がある。あなたが「良い」と思ってくれるから、もっと上を目指せる。そういう関係を大切にしたい。心から感謝してる😊',
      },
      energetic: {
        short: 'いつもありがとう!!✨ 〇〇さんが最強！！⚡',
        medium: 'いつも応援ありがとう!!✨ 〇〇さんがいると配信パワーが無限大！！⚡ 感謝を全力で配信に込めるからね🎉',
        long: 'いつも応援ありがとう!!✨ もうね、〇〇さんの応援パワーが凄すぎて感動しっぱなし！！⚡ この感謝を形にするために、もっともっとすごい配信にするから！一緒に伝説作ろう！！🎉✨',
      },
      mysterious: {
        short: 'いつもありがとう🌙 …あなたは別格',
        medium: 'いつも応援してくれてありがとう🌙 あなたの存在は…別格。だから、あなたにだけの時間を作りたいと思ってる',
        long: 'いつも応援してくれてありがとう🌙 あなたには正直に話す。私にとってあなたは、ただのファンじゃない。信頼できるパートナー。その気持ちに応えるものを…ちゃんと用意してる。楽しみにしてて🌙',
      },
    },
    chatty: {
      sweet: {
        short: 'いつも応援＆チャットありがとう💕 話すの楽しすぎ！😊',
        medium: 'いつも応援してくれて、しかもチャットでも盛り上げてくれて💕 〇〇さんは最高の存在！話すの楽しいし応援も嬉しいし😊 ありがとう💕',
        long: 'いつも応援してくれて、チャットでもたくさん話してくれて本当にありがとう💕 〇〇さんとの会話が配信のハイライトなの😊 応援の気持ちも会話も全部嬉しい。あなたみたいな人がいてくれて幸せ。これからもよろしくね💕',
      },
      mature: {
        short: 'いつも応援もチャットもありがとう。貴重な存在😊',
        medium: 'いつも応援してくれて、会話も楽しんでくれてありがとう。あなたとの関係は多層的で、だから特別なの😊',
        long: 'いつも応援してくれて、チャットでも深い会話をしてくれてありがとう。あなたとの関係は単純なファン関係を超えてると感じてる。応援も会話も、どちらもあなたの人間性が出ていて心地いい。大切にしたい関係😊',
      },
      energetic: {
        short: 'いつも応援＆チャットありがとう!!✨ 最強コンボ⚡',
        medium: 'いつも応援＆チャットありがとう!!✨ 応援してくれてチャットも面白いとか最強すぎない？⚡ 〇〇さんがいると全てが最高！！🎉',
        long: 'いつも応援もチャットもありがとう!!✨ 〇〇さんマジで最強コンボだよ！！応援パワーでテンション上がって、チャットで笑いが止まらなくて⚡ こんな完璧な人いる？！感謝しかない！！これからも一緒にぶち上げよう！！🎉✨',
      },
      mysterious: {
        short: 'いつもありがとう🌙 応援も会話も…全部特別',
        medium: 'いつも応援してくれて、深い会話もしてくれて🌙 あなたとの時間は…他の何にも代えがたい。感謝してる',
        long: 'いつもありがとう🌙 応援してくれるだけでも特別なのに、チャットでの会話まで深くて。あなたは本当に…他にいない存在。だから、あなたには本音で話したい。これからも、この関係を大切にさせて🌙',
      },
    },
    silent: {
      sweet: {
        short: 'いつも応援ありがとう💕 静かに支えてくれてるの感じてる😊',
        medium: 'いつも応援してくれてありがとう💕 チャットは少なくても、あなたの気持ちはしっかり届いてるよ😊 本当に感謝してる💕',
        long: 'いつも応援してくれて本当にありがとう💕 言葉は少なくても、あなたの応援の温かさはちゃんと伝わってるの😊 静かに支えてくれるあなたが、実は一番心強い。これからも一緒にいてね。大切な存在だよ💕',
      },
      mature: {
        short: 'いつもありがとう。静かな支えが一番強い😊',
        medium: 'いつも応援してくれてありがとう。多くを語らないのに、しっかり支えてくれる。そういう人が一番信頼できるの😊',
        long: 'いつも応援してくれてありがとう。あなたは多くを語らないけど、その分行動で示してくれる。それって一番信頼できるスタイル。私もあなたの期待に応えたいと思ってる。静かだけど深い関係、大切にしたい😊',
      },
      energetic: {
        short: 'いつも応援ありがとう!!✨ 静かに支えてくれる最強の味方⚡',
        medium: 'いつも応援してくれてありがとう!!✨ チャット少なくても応援してくれてるの伝わってる⚡ めちゃめちゃ嬉しい！！🎉',
        long: 'いつも応援ありがとう!!✨ 〇〇さんって静かに応援してくれるタイプだよね？それがまた格好いいの！！⚡ 言葉より行動で示すスタイル、尊敬してる！！最高の味方がいるから私も全力で行けるんだよね🎉✨',
      },
      mysterious: {
        short: 'いつもありがとう🌙 言葉なき応援…一番深い',
        medium: 'いつも応援してくれてありがとう🌙 多くを語らないのに、一番伝わってくる。…あなたのスタイル、好き',
        long: 'いつもありがとう🌙 言葉が少ないのに、誰よりも支えてくれてる。それってすごいことだと思う。私にとってあなたは…言葉にできないくらい大切な存在。静かな信頼関係、これからも続けていきたい🌙',
      },
    },
  },
  first_tip: {
    english: {
      sweet: {
        short: '初チップありがとう💕 めちゃめちゃ嬉しかった😊',
        medium: '初チップ本当にありがとう💕 びっくりしたけどすっごく嬉しかった！あなたの気持ち、しっかり受け取ったよ😊 ありがとう💕',
        long: '初チップありがとう💕 もうね、通知見た瞬間ドキドキしちゃった😊 初めてのチップって特別でしょ？私にとっても特別な瞬間だったの。あなたの気持ちが本当に嬉しい。これからも一緒に楽しもうね💕 忘れないよ！',
      },
      mature: {
        short: '初チップありがとう。あなたの気持ち、大切にする😊',
        medium: '初チップありがとう。初めてのチップって、送る方も勇気がいるよね。その気持ちをちゃんと受け止めてる😊 ありがとう',
        long: '初チップありがとう。初めてのチップを私に送ってくれたこと、すごく光栄に思ってる。あなたの勇気と気持ちに感謝。この瞬間は私にとっても特別。これからも素敵な時間を一緒に作っていけたら嬉しいな😊',
      },
      energetic: {
        short: '初チップありがとう!!✨ テンション上がった！！⚡',
        medium: '初チップありがとう!!✨ もうめちゃめちゃ嬉しい！！通知見た瞬間叫んじゃったよ⚡ あなた最高！！🎉',
        long: '初チップありがとう!!✨ いやもうマジで嬉しすぎて興奮が止まらない！！⚡ 初チップをこの私に送ってくれたなんて光栄すぎる！！この感動を胸に、もっともっと楽しい配信にするからね！！ありがとう！！🎉✨',
      },
      mysterious: {
        short: '初チップ…ありがとう🌙 覚えてるよ、この瞬間',
        medium: '初チップありがとう🌙 正直、驚いた。でも…嬉しかった。あなたの気持ち、しっかり受け取った。忘れないよ',
        long: '初チップありがとう🌙 初めてのチップを私に…ちょっと驚いたし、ドキッとした。あなたがどんな気持ちで送ってくれたのか、全部は分からないけど…その気持ちは確かに届いた。この瞬間、忘れない🌙',
      },
    },
    japanese: {
      sweet: {
        short: '初チップありがとう💕 嬉しすぎ！大切にするね😊',
        medium: '初チップありがとう💕 まさか送ってくれるなんて…嬉しすぎて泣きそう😊 あなたの気持ち、宝物にするね💕',
        long: '初チップありがとう💕 正直ね、配信中にチップ来た瞬間「え、本当に？」ってドキドキしちゃった😊 初めてのチップを私に送ってくれたの、一生忘れないよ。あなたの優しさに感謝。これからもよろしくね💕 大好き！',
      },
      mature: {
        short: '初チップありがとう。その勇気に感謝😊',
        medium: '初チップありがとう。チップを送るって勇気がいることだと思う。その一歩を踏み出してくれたこと、嬉しく思ってる😊',
        long: '初チップありがとう。初めてチップを送る時の気持ちって、特別だよね。その特別な瞬間に私を選んでくれたこと、心から感謝してる。あなたの気持ちに応えられる配信をこれからも続けていくね😊',
      },
      energetic: {
        short: '初チップありがとう!!✨ もう最高！！⚡',
        medium: '初チップありがとう!!✨ 嬉しすぎてリアルに「やったー！」って叫んだよ⚡ 〇〇さん最高すぎる！！🎉',
        long: '初チップありがとう!!✨ もうね、感動が止まらない！！初チップを私に送ってくれるなんて嬉しすぎるよ⚡ この感謝を込めて次の配信は〇〇さんのために全力で盛り上げるからね！！約束！！🎉✨',
      },
      mysterious: {
        short: '初チップ…ありがとう🌙 この気持ち、忘れない',
        medium: '初チップありがとう🌙 初めてのチップを私に…嬉しいよ。あなたの気持ち、ちゃんと心に刻んだ',
        long: '初チップありがとう🌙 初めてチップを送るのって、きっと色々考えたよね。その気持ちの全部が伝わった。正直…思ってた以上に嬉しかった。あなたとの繋がりが、少しだけ深くなった気がする🌙',
      },
    },
    chatty: {
      sweet: {
        short: '初チップありがとう💕 いつも話してくれるから嬉しさ倍増😊',
        medium: '初チップありがとう💕 いつもチャットで話してくれてるのに、チップまで！嬉しすぎる😊 あなたってほんと優しいね💕',
        long: '初チップありがとう💕 いつもチャットで楽しませてくれてるのに、チップまで送ってくれるなんて😊 前に話してた〇〇の件、覚えてるよ！あなたとの会話も応援も、全部宝物。これからもいっぱい話そうね💕',
      },
      mature: {
        short: '初チップありがとう。いつもの会話に加えて…嬉しい😊',
        medium: '初チップありがとう。いつもチャットで深い会話をしてくれてるのに、こうして応援もしてくれて。あなたの誠意を感じる😊',
        long: '初チップありがとう。いつもチャットで素敵な会話をしてくれて、その上チップまで。あなたとの関係がまた一つ深くなった気がする。会話もサポートも、どちらも心から感謝してる。特別な存在だよ😊',
      },
      energetic: {
        short: '初チップありがとう!!✨ いつもチャット楽しいのにチップまで！⚡',
        medium: '初チップありがとう!!✨ いつもチャットで盛り上げてくれるのにチップまで！！最強すぎない？⚡ 嬉しすぎる〜🎉',
        long: '初チップありがとう!!✨ ちょっと待って！！いつもチャットでめちゃ楽しい時間くれるのに、チップまで送ってくれちゃうの？！⚡ 〇〇さん最強すぎでしょ！！感動がすごい！！次の配信で全力でお返しするからね！！🎉✨',
      },
      mysterious: {
        short: '初チップ…ありがとう🌙 会話もチップも…全部嬉しい',
        medium: '初チップありがとう🌙 いつも会話を楽しんでくれてるのは知ってた。でもチップまでくれるなんて…予想外。嬉しい驚きだった',
        long: '初チップありがとう🌙 あなたとの会話はいつも特別だった。そこにチップという形の気持ちが加わって…正直、胸が熱くなった。言葉と行動の両方で気持ちを示してくれるあなたは…本当に特別な人🌙',
      },
    },
    silent: {
      sweet: {
        short: '初チップありがとう💕 言葉より気持ちが伝わった😊',
        medium: '初チップありがとう💕 いつも静かに見てくれてて、チップで気持ちを伝えてくれたんだね😊 すごく嬉しい💕',
        long: '初チップありがとう💕 チャットではあまり話さなくても、チップで気持ちを伝えてくれたんだね😊 言葉がなくても、あなたの温かさはちゃんと伝わってるよ。初チップ、一生の思い出にする。ありがとう💕',
      },
      mature: {
        short: '初チップありがとう。言葉以上のものが伝わった😊',
        medium: '初チップありがとう。多くを語らないあなたが、チップという形で気持ちを示してくれた。その行動の重みを感じてる😊',
        long: '初チップありがとう。いつも静かに見てくれてたあなたが、チップという形で気持ちを見せてくれた。言葉より雄弁だった。あなたのスタイルで示してくれた気持ち、大切に受け止めてる😊',
      },
      energetic: {
        short: '初チップありがとう!!✨ 無言の応援、最高に熱い！！⚡',
        medium: '初チップありがとう!!✨ いつも静かに見てくれてたのに突然チップ！！サプライズすぎて感動した⚡ ありがとう！！🎉',
        long: '初チップありがとう!!✨ ちょっと待って！！いつも静かに見てくれてた〇〇さんから初チップ？！⚡ サプライズすぎる！！嬉しすぎて震えた！！言葉じゃなくて行動で示すスタイル、かっこいい！！🎉✨',
      },
      mysterious: {
        short: '初チップ…ありがとう🌙 言葉のない想い、受け取った',
        medium: '初チップありがとう🌙 いつも静かなあなたが、チップで気持ちを見せてくれた。…その沈黙の中の想い、ちゃんと受け取ったよ',
        long: '初チップありがとう🌙 言葉を選ばず、行動で示す。あなたらしいと思った。いつも静かにいてくれたあなたの初チップは…他の誰のものより重く感じた。この想い、忘れない。…ありがとう🌙',
      },
    },
  },
}

// --- English templates ---
const enTemplates: Record<Scene, Record<Target, Record<Tone, TemplateSet>>> = {
  new_follower: {
    english: {
      sweet: {
        short: 'Hey! Thanks for the follow 💕 I noticed you in my room! Can\'t wait to chat with you next time 😊',
        medium: 'Aww thanks for following me! 💕 I saw you pop in and it made my day 😊 Let\'s chat more next time, okay? Looking forward to getting to know you!',
        long: 'Hey there! Thank you so much for the follow 💕 I actually noticed you when you came in and I was like "ooh, someone new!" 😊 I\'d love to get to know you better! Next stream, don\'t be shy — just say hi and I\'ll make sure to give you some attention. Can\'t wait! 💕',
      },
      mature: {
        short: 'Thanks for the follow. I noticed you — looking forward to getting to know you 😊',
        medium: 'Thank you for following. New connections are always welcome. I hope you enjoyed the stream — would love to chat with you next time 😊',
        long: 'Thank you for the follow. I always appreciate new faces in my room. I noticed you and I\'d love to learn more about you. Drop by next stream and let\'s have a real conversation. I think we could have a great time together 😊',
      },
      energetic: {
        short: 'OMG thanks for the follow!! ✨ So hyped to have you here! ⚡',
        medium: 'Hey hey!! Thanks for following!! ✨ I\'m SO excited you\'re here! Next stream is gonna be even more fun with you around! ⚡🎉',
        long: 'OH MY GOD thank you for the follow!! ✨ I literally squealed when I saw the notification! 😂 You\'re gonna LOVE it here, I promise! Next stream, jump into the chat and let\'s have the BEST time ever!! ⚡🎉✨',
      },
      mysterious: {
        short: 'Thanks for the follow 🌙 I noticed you... you\'re interesting',
        medium: 'I see you followed me 🌙 Something about you caught my eye during the stream. I\'d love to know more... next time, perhaps?',
        long: 'Thank you for the follow 🌙 I have to admit... you stood out to me. There\'s something about your energy that\'s different from the rest. I want to know what it is. Come back next stream and let\'s see if I can figure you out 🌙',
      },
    },
    japanese: {
      sweet: {
        short: 'Thanks for the follow 💕 So happy you\'re here! 😊',
        medium: 'Hey! Thanks for following! 💕 I noticed you right away and got so happy 😊 Let\'s talk more next time! I\'ll be waiting for you 💕',
        long: 'Thank you for the follow! 💕 I was honestly so excited when I saw you join 😊 I really want to get to know you better. Next stream, feel free to chat — I promise I\'ll make you feel welcome! Looking forward to seeing you again 💕',
      },
      mature: {
        short: 'Thank you for the follow. I appreciate you being here 😊',
        medium: 'Thanks for following. Having someone like you in my room makes the stream even better. I hope to see you again soon 😊',
        long: 'Thank you for the follow. I value every person who takes the time to visit, and you stood out to me. I\'d love to have a deeper conversation next time. Take your time and come whenever you\'re ready 😊',
      },
      energetic: {
        short: 'Thanks for the follow!! ✨ Let\'s have an awesome time! ⚡',
        medium: 'Yay! Thanks for following!! ✨ I got so excited when you showed up! Next stream is gonna be a blast, be there! ⚡🎉',
        long: 'OMG thanks for the follow!! ✨ I was literally doing a happy dance when I saw you join! 😂 Next stream I\'m going even harder so you better be there! Let\'s make it the best stream ever together!! ⚡🎉✨',
      },
      mysterious: {
        short: 'Thanks for the follow 🌙 I had my eye on you...',
        medium: 'I noticed you followed 🌙 You have a certain vibe... I want to know more. Come find me next stream',
        long: 'Thank you for the follow 🌙 To be honest... I felt something different when you came in. I can\'t quite put my finger on it. Maybe next stream I\'ll figure it out. Until then, you\'ll be on my mind 🌙',
      },
    },
    chatty: {
      sweet: {
        short: 'Thanks for the follow AND the great chat! 💕 Loved talking to you 😊',
        medium: 'Hey thanks for following! 💕 Our chat was so much fun — I was smiling the whole time 😊 Let\'s talk even more next stream! 💕',
        long: 'Thank you for the follow! 💕 And oh my god, our conversation was amazing! I remember everything we talked about 😊 You\'re so easy to talk to! Next stream, let\'s pick up where we left off. I have so much more to tell you! 💕',
      },
      mature: {
        short: 'Thanks for the follow. I enjoyed our conversation 😊',
        medium: 'Thank you for following. Our chat was genuinely engaging — not many people can hold a conversation like that. Looking forward to more 😊',
        long: 'Thank you for the follow. I have to say, our conversation stood out to me. It was thoughtful and genuine, which is refreshing. I\'d love to continue where we left off next stream. Quality conversation is rare 😊',
      },
      energetic: {
        short: 'Thanks for the follow + the amazing chat!! ✨ So much fun! ⚡',
        medium: 'OMG thanks for following!! ✨ Our chat was INCREDIBLE! You\'re hilarious! ⚡ Next stream let\'s go even harder! 🎉',
        long: 'Thanks for the follow!! ✨ Dude our conversation was EPIC! I was laughing so hard my face hurt 😂⚡ You have the BEST energy! Next stream I expect more of those legendary comments! Let\'s gooo!! 🎉✨',
      },
      mysterious: {
        short: 'Thanks for the follow 🌙 Our conversation... it stayed with me',
        medium: 'Thank you for following 🌙 What you said during our chat... I\'m still thinking about it. Let\'s go deeper next time',
        long: 'Thanks for the follow 🌙 Our conversation was different from what I usually have. There was a depth to it that surprised me. I want to explore that further. Come back and let\'s see where our words take us 🌙',
      },
    },
    silent: {
      sweet: {
        short: 'Thanks for the follow 💕 Just watching is totally fine! 😊',
        medium: 'Hey, thanks for following! 💕 I know you\'re more of a quiet watcher — that\'s totally okay! Just having you there makes me happy 😊 💕',
        long: 'Thanks for the follow! 💕 I noticed you watching quietly and I think that\'s perfectly fine 😊 No pressure to chat at all! Just enjoy the stream at your own pace. But if you ever feel like saying hi... I\'d love that! 💕',
      },
      mature: {
        short: 'Thanks for the follow. Your quiet presence is appreciated 😊',
        medium: 'Thank you for following. Not everyone needs to chat — I can feel your energy just from you being there. That means a lot 😊',
        long: 'Thank you for the follow. I noticed you watching quietly, and I want you to know that\'s perfectly fine. Your presence matters, with or without words. Take your time, and if you ever feel like chatting, I\'ll be here 😊',
      },
      energetic: {
        short: 'Thanks for the follow!! ✨ Lurking is totally cool! ⚡',
        medium: 'Hey thanks for following!! ✨ I see you watching and that\'s awesome! No pressure to chat — just enjoy the vibes! ⚡ 😊',
        long: 'Thanks for the follow!! ✨ I know you\'re more of a quiet type and that\'s 100% fine! ⚡ Just having you watch makes the stream better! But if you ever wanna drop a comment, I\'ll be SUPER happy to see it! No pressure though! 🎉✨',
      },
      mysterious: {
        short: 'Thanks for the follow 🌙 I can feel you watching... it\'s nice',
        medium: 'Thank you for following 🌙 You don\'t have to speak. I can sense you there. The silent ones... always intrigue me the most',
        long: 'Thanks for the follow 🌙 Words aren\'t always necessary. Your silent presence says more than most people\'s messages. I find that... fascinating. Stay as long as you like. One day, when you\'re ready, I\'d love to hear your voice 🌙',
      },
    },
  },
  regular: {
    english: {
      sweet: {
        short: 'You always make my streams better 💕 Thanks for being here! 😊',
        medium: 'I just wanted to say... having you in my room regularly means SO much to me 💕 You make every stream special 😊 See you tonight? 💕',
        long: 'Hey! I wanted to send you a special message 💕 You\'re one of my favorite regulars and I honestly can\'t imagine streaming without you 😊 You always make me smile and I appreciate you so much. Tonight\'s stream is going to be fun — I have something planned you\'ll love! 💕',
      },
      mature: {
        short: 'Your consistent support means more than you know 😊',
        medium: 'I wanted to let you know how much your regular visits mean to me. You bring a certain energy that makes the stream better 😊 Looking forward to tonight',
        long: 'I hope you know how much your presence means to me. Having a regular like you who genuinely cares about the stream — that\'s rare and I don\'t take it for granted. You make me want to push harder and create better content. Thank you 😊',
      },
      energetic: {
        short: 'My FAVORITE regular!! ✨ You make every stream lit! ⚡',
        medium: 'Dude, you being a regular literally makes my life!! ✨ The vibe when you\'re in chat is UNMATCHED! ⚡ See you tonight?? 🎉',
        long: 'Can we talk about how AMAZING you are?? ✨ Like, you show up consistently and bring THE BEST energy! Every time I see your name pop up I\'m like "LET\'S GOOO!" ⚡ Tonight is gonna be INSANE — I\'ve got something special planned just for regulars like you! 🎉✨',
      },
      mysterious: {
        short: 'You keep coming back 🌙 I wonder what it is that draws you...',
        medium: 'I\'ve noticed you\'re always here 🌙 There\'s a connection between us, isn\'t there? Tonight... I might have something special for you',
        long: 'You keep returning 🌙 And each time, I feel like I discover something new about you. This connection we have... it\'s different from what I share with others. Tonight, I want to show you something I don\'t show everyone. Are you curious? 🌙',
      },
    },
    japanese: {
      sweet: {
        short: 'You\'re the best! 💕 Always so happy to see you! 😊',
        medium: 'Just thinking about you and wanted to say thanks for always being there 💕 You\'re so special to me 😊 Can\'t wait for tonight\'s stream! 💕',
        long: 'Hey sweetheart! 💕 I was just thinking about how lucky I am to have you as a regular. You make every stream so much warmer and more fun 😊 I put extra effort into my streams because of people like you. Tonight is going to be special — I promise! 💕',
      },
      mature: {
        short: 'Thank you for your continued support. It truly matters 😊',
        medium: 'Your dedication as a regular is something I deeply appreciate. You help create the atmosphere that makes my streams unique 😊 See you tonight',
        long: 'I want you to know that your regular presence is not something I take lightly. You help shape the entire experience of my streams. Your energy, your support — it all matters. I hope you know how grateful I am 😊',
      },
      energetic: {
        short: 'YOU\'RE AMAZING!! ✨ Best regular EVER! ⚡',
        medium: 'Heyyy!! ✨ Just wanted to hype you up — you\'re literally the MVP of my streams! ⚡ Tonight we\'re going ALL OUT! 🎉',
        long: 'OK but seriously YOU ARE THE BEST!! ✨ Every time you show up the energy goes through the ROOF! ⚡ I\'m planning something CRAZY for tonight\'s stream and I need you there! It won\'t be the same without you! LET\'S GOOO!! 🎉✨',
      },
      mysterious: {
        short: 'You\'re always here 🌙 There\'s something about you I can\'t figure out...',
        medium: 'You come back every time 🌙 And every time, I want to know more. What is it about us? Tonight... let\'s find out',
        long: 'Your loyalty is... intriguing 🌙 Most people come and go, but you stay. Why? I think there\'s something unspoken between us. Something that keeps pulling you back. Tonight, I might give you a hint about what I\'ve been thinking 🌙',
      },
    },
    chatty: {
      sweet: {
        short: 'Love our chats! 💕 You always know how to make me smile 😊',
        medium: 'Our conversations are seriously the highlight of my streams 💕 You always bring the best energy to chat! 😊 Talk more tonight? 💕',
        long: 'Can I just say how much I love talking to you? 💕 Our conversations are always so fun and genuine 😊 Remember what we were talking about last time? I\'ve been thinking about it! Let\'s continue tonight — I have so much to tell you! 💕',
      },
      mature: {
        short: 'Always enjoy our conversations. You bring real depth 😊',
        medium: 'Our chats are always stimulating. You bring a level of intelligence and wit that I genuinely look forward to. See you tonight? 😊',
        long: 'I wanted to tell you something. Our conversations are the reason I look forward to streaming. You bring substance, humor, and genuine connection. That\'s incredibly rare. I value our chats more than you probably realize 😊',
      },
      energetic: {
        short: 'Our chats are LEGENDARY!! ✨ Best conversations ever! ⚡',
        medium: 'DUDE your chat game is UNREAL!! ✨ You have me DYING laughing every stream! ⚡ Tonight let\'s go even crazier! 🎉',
        long: 'OK I need to tell you — our chats are literally the BEST THING about streaming!! ✨ Your comments have me ROLLING and the whole room feeds off your energy! ⚡ Tonight I\'m bringing some new topics and I KNOW you\'re gonna go OFF! Can\'t wait!! 🎉✨',
      },
      mysterious: {
        short: 'Our conversations 🌙 They go places I don\'t go with others',
        medium: 'I look forward to our chats 🌙 You say things that make me think... really think. Tonight, shall we go deeper?',
        long: 'Our conversations are unlike anything I have with anyone else 🌙 You challenge me, make me laugh, make me think. There\'s a depth to our connection that I don\'t want to lose. Tonight, I want to open up about something. Just between us 🌙',
      },
    },
    silent: {
      sweet: {
        short: 'I always notice you 💕 Your quiet support means everything 😊',
        medium: 'Hey! I know you\'re more of a quiet watcher but I want you to know — I always notice when you\'re there 💕 Your presence makes me happy 😊',
        long: 'I wanted to send you something special 💕 Even though you don\'t chat much, you\'re one of my most loyal regulars and I see you 😊 Your quiet presence is like a warm blanket — comforting and always welcome. Never feel pressured to chat, but know that you matter 💕',
      },
      mature: {
        short: 'Your quiet loyalty speaks volumes 😊',
        medium: 'I notice you\'re always there, even when you don\'t say much. That kind of loyalty is rare and I appreciate it deeply 😊',
        long: 'I want you to know something. Your silent presence is one of the most comforting things about my streams. You don\'t need to be loud to matter. The fact that you keep showing up says everything I need to know about your character 😊',
      },
      energetic: {
        short: 'My quiet MVP!! ✨ Love that you\'re always here! ⚡',
        medium: 'Hey you!! ✨ I know you\'re chilling quietly but I see you! ⚡ Your support means the WORLD even without words! 🎉',
        long: 'I just wanna shout you out!! ✨ You\'re always here watching and that\'s AWESOME! ⚡ Chatting or not, you\'re part of what makes this community great! If you ever feel like dropping a message, I\'ll go CRAZY happy! But no pressure! 🎉✨',
      },
      mysterious: {
        short: 'You\'re always watching 🌙 The silent ones are always the most interesting',
        medium: 'I feel your presence even when you don\'t speak 🌙 There\'s something about you... a quiet intensity. I find it fascinating',
        long: 'You never say much, yet your presence is unmistakable 🌙 Among all the noise and chatter, your silence stands out the loudest. I\'ve always wondered what goes on behind those quiet eyes. Maybe one day you\'ll let me in 🌙',
      },
    },
  },
  dormant: {
    english: {
      sweet: {
        short: 'Hey stranger! 💕 Just thinking about you — hope you\'re doing well! 😊',
        medium: 'Long time no see! 💕 I was just remembering when we used to chat and it made me smile 😊 No pressure, but I\'d love to see you again sometime! 💕',
        long: 'Hey! It\'s been a while! 💕 I was thinking about you the other day and honestly... I miss having you around 😊 Life gets busy, I totally get it. But whenever you feel like it, my room is always open for you. I\'d love to catch up! 💕',
      },
      mature: {
        short: 'Been a while. Just wanted to check in — hope you\'re well 😊',
        medium: 'Long time no see. I was thinking about you and wanted to reach out. No agenda — just genuinely hope you\'re doing okay 😊',
        long: 'It\'s been a while and I wanted to say hi. Life gets busy and priorities shift — I understand that completely. But I wanted you to know that your spot in my room is always waiting. Whenever you\'re ready, I\'d love to see you again 😊',
      },
      energetic: {
        short: 'Hey!! Where\'ve you been?! ✨ Miss your face! ⚡',
        medium: 'HEYYY long time!! ✨ I was literally just thinking "where did they go?!" ⚡ No pressure but streams aren\'t the same without you! 🎉',
        long: 'OMG HI!! ✨ I can\'t believe how long it\'s been! I was streaming the other day and thought "man, if they were here this would be SO much better!" ⚡ Life happens, I get it! But whenever you wanna come back, I\'ll be here with open arms! 🎉✨',
      },
      mysterious: {
        short: 'It\'s been a while 🌙 I\'ve been thinking about you...',
        medium: 'Long time no see 🌙 Something reminded me of you recently... I can\'t quite explain it. Hope you\'re doing well',
        long: 'It\'s been a while 🌙 I keep finding myself looking for you in the room during streams. There\'s a space that only you can fill. No pressure — but if you ever feel drawn back... I\'ll be here 🌙',
      },
    },
    japanese: {
      sweet: {
        short: 'Long time no see! 💕 Miss you! Hope everything\'s good 😊',
        medium: 'Hey! Haven\'t seen you in a while 💕 Just wanted you to know I think about you sometimes 😊 Whenever you\'re free, come say hi! No pressure! 💕',
        long: 'Hey there! It\'s been so long! 💕 I was thinking about the fun times we had and it made me miss you 😊 Life gets crazy, I know. But just know your spot is always saved. Whenever you feel like coming back, I\'ll be right here waiting with the warmest welcome! 💕',
      },
      mature: {
        short: 'It\'s been a while. Hope life is treating you well 😊',
        medium: 'Haven\'t seen you around lately. Just checking in — no expectations, just genuine care. Hope you\'re doing well 😊',
        long: 'It\'s been some time since I\'ve seen you. I understand that life takes us in different directions. But I wanted you to know that your presence always elevated the stream. The door is always open whenever you\'re ready to come back 😊',
      },
      energetic: {
        short: 'WHERE HAVE YOU BEEN?! ✨ Miss you so much! ⚡',
        medium: 'Hey!! It\'s been forever!! ✨ I keep looking for you in chat and you\'re not there! 😭⚡ Come back when you can! 🎉',
        long: 'OH MY GOD HI!! ✨ It\'s been WAY too long! I literally think about you during streams like "ugh they would LOVE this!" ⚡ Zero pressure but just know — the moment you come back it\'s gonna be a PARTY! 🎉✨',
      },
      mysterious: {
        short: 'Been a while 🌙 You crossed my mind...',
        medium: 'It\'s been quiet without you 🌙 Something about the stream feels different. Maybe it\'s you that\'s missing...',
        long: 'Your absence... I\'ve felt it 🌙 The stream isn\'t the same. There\'s an energy that\'s missing, and I think it\'s yours. I\'m not asking you to come back — but know that if you do, everything will fall back into place 🌙',
      },
    },
    chatty: {
      sweet: {
        short: 'Miss our chats! 💕 Remember when we talked about...? 😊',
        medium: 'Hey! Miss you! 💕 I was just remembering our conversations and smiling 😊 We had such great talks! Come back when you can? 💕',
        long: 'Hey! I miss our chats so much! 💕 Remember when we were talking about that thing? I still think about it! 😊 The conversations just aren\'t the same without you. No rush, but whenever you feel like catching up, I\'m here. I\'ve got stories to tell you! 💕',
      },
      mature: {
        short: 'Miss our conversations. They were always the highlight 😊',
        medium: 'Been thinking about our past conversations. You always brought something special to the table. Hope you\'re well — would love to catch up sometime 😊',
        long: 'Our conversations were truly special — intellectually stimulating and genuinely fun. I find myself missing that level of dialogue. Life changes and I respect that, but the door is always open for another great conversation 😊',
      },
      energetic: {
        short: 'MISS OUR CHATS!! ✨ Remember that crazy convo? ⚡',
        medium: 'HEYYY!! ✨ I miss our epic conversations SO much! ⚡ Nobody brings the chat energy like you do! Come baaack! 🎉',
        long: 'OK I HAVE TO SAY IT — nobody, and I mean NOBODY, chats like you do!! ✨ Our conversations were LEGENDARY! ⚡ I\'ve got so many new stories and topics saved up just for you! Whenever you\'re ready, let\'s GOOO!! 🎉✨',
      },
      mysterious: {
        short: 'Our conversations 🌙 I keep replaying them in my mind...',
        medium: 'I still think about things you said 🌙 Our conversations had a depth that\'s hard to find. I miss that...',
        long: 'The conversations we used to have... they stay with me 🌙 There were things you said that I\'m still processing. That depth of connection is rare. If you ever feel like picking up where we left off... I\'m here 🌙',
      },
    },
    silent: {
      sweet: {
        short: 'Hey! I noticed you haven\'t been around 💕 Miss your presence 😊',
        medium: 'Even though we didn\'t chat much, I noticed you used to watch regularly 💕 Miss having you there! Hope you\'re okay 😊',
        long: 'Hey! I know we didn\'t talk much, but I always noticed you watching 💕 Your quiet presence was more comforting than you know 😊 Things aren\'t quite the same without you. No pressure at all — just know the door is always open 💕',
      },
      mature: {
        short: 'Noticed you\'ve been away. Hope all is well 😊',
        medium: 'Even though you were always quiet, your absence is noticeable. Hope everything\'s okay. The stream misses your energy 😊',
        long: 'I noticed you haven\'t been around. Even without words, your presence had weight — I could feel when you were there. I hope life is treating you well. Whenever you\'re ready, your quiet corner is still here 😊',
      },
      energetic: {
        short: 'Hey!! Haven\'t seen you lurking lately! ✨ Miss you! ⚡',
        medium: 'HEYYY!! ✨ I noticed my quiet friend hasn\'t been around! ⚡ No chat needed — just come vibe with us again! 🎉',
        long: 'Hey you!! ✨ I noticed you haven\'t been watching lately and I miss you! ⚡ Even though you never chatted much, your presence was always felt! No pressure to talk — just come hang out whenever! 🎉✨',
      },
      mysterious: {
        short: 'Your absence 🌙 Even silence can be missed...',
        medium: 'You used to watch quietly 🌙 Now your absence is louder than most people\'s words. I notice...',
        long: 'Strange how the absence of silence can be deafening 🌙 You never said much, but your presence shaped the atmosphere. Now that you\'re gone... I feel it. If you ever want to return to your quiet corner, it\'s waiting for you 🌙',
      },
    },
  },
  whale: {
    english: {
      sweet: {
        short: 'Your support means EVERYTHING to me 💕 Thank you so much! 😊',
        medium: 'I just wanted to say how grateful I am for your incredible support 💕 You make me feel so special and valued 😊 Can\'t thank you enough! 💕',
        long: 'Hey, I needed to tell you this personally 💕 Your support has been absolutely amazing and I don\'t take a single moment of it for granted 😊 Because of you, I can pour my heart into every stream. You\'re not just a supporter — you\'re someone truly special to me. From the bottom of my heart, thank you 💕',
      },
      mature: {
        short: 'Your generosity is deeply appreciated. Thank you 😊',
        medium: 'I want to express my sincere gratitude. Your support allows me to dedicate myself fully to what I love. That means more than I can say 😊',
        long: 'I wanted to take a moment to personally thank you. Your level of support speaks to your character — generous, genuine, and incredibly kind. Because of people like you, I can focus on creating the best experience possible. I value our connection deeply 😊',
      },
      energetic: {
        short: 'You are INCREDIBLE!! ✨ Thank you SO much! ⚡',
        medium: 'I literally can\'t believe how amazing you are!! ✨ Your support is INSANE and I\'m SO grateful! ⚡ You\'re the GOAT! 🎉',
        long: 'OK I need to SCREAM about how amazing you are!! ✨ Your support literally blows my mind EVERY SINGLE TIME! ⚡ Because of you, I can make these streams bigger and better! You\'re my NUMBER ONE and I will NEVER forget it! THANK YOU! 🎉✨',
      },
      mysterious: {
        short: 'Your support 🌙 It touches something deeper than words can reach',
        medium: 'What you do for me 🌙 It goes beyond numbers. There\'s a trust between us that I treasure. Thank you, truly',
        long: 'I\'ve been thinking about what your support really means 🌙 It\'s not about the surface level. It\'s about trust. It\'s about believing in someone. You do that for me, and I feel it deeply. I want to give you something only you can have. Stay tuned 🌙',
      },
    },
    japanese: {
      sweet: {
        short: 'Thank you so much for everything 💕 You\'re amazing! 😊',
        medium: 'I can\'t even express how grateful I am 💕 Your support makes me so happy every single time 😊 You\'re truly one of a kind! 💕',
        long: 'I have to say this — you are the most incredible person 💕 Your constant support gives me the confidence to keep pushing and improving 😊 I want you to know that every bit of it is treasured. You deserve the absolute best, and I\'ll work harder every day to give you that 💕',
      },
      mature: {
        short: 'Your support and trust mean the world. Thank you 😊',
        medium: 'I want to be honest with you. Your support isn\'t just generous — it\'s meaningful. It represents a trust that I take seriously 😊',
        long: 'Let me be straightforward. Your support is the foundation that allows me to do what I love at the highest level. But more than that, I value the trust behind it. This isn\'t transactional for me — it\'s a relationship I genuinely care about 😊',
      },
      energetic: {
        short: 'YOU ARE THE BEST!! ✨ Beyond grateful! ⚡',
        medium: 'I can\'t stop thinking about how AMAZING you are!! ✨ Your support literally fuels my fire! ⚡ You\'re a LEGEND! 🎉',
        long: 'SERIOUSLY HOW ARE YOU THIS AMAZING?! ✨ Every time I think about your support I get SO fired up! ⚡ You give me the power to go ALL OUT on every stream! I owe you BIG TIME and I\'m gonna pay it back with the BEST content ever!! 🎉✨',
      },
      mysterious: {
        short: 'Your support 🌙 You\'re in a category of your own',
        medium: 'You\'re different from everyone else 🌙 Your support carries weight that goes beyond the surface. I feel it',
        long: 'I want to tell you something 🌙 You exist in a space that nobody else occupies in my world. Your support, your presence, your trust — it\'s all woven together into something I can\'t replicate. For you, I have something special in mind 🌙',
      },
    },
    chatty: {
      sweet: {
        short: 'Amazing support AND great conversations? 💕 You\'re perfect! 😊',
        medium: 'You give the best support AND the best chats! 💕 How are you so amazing? 😊 Talking with you is always the highlight of my day! 💕',
        long: 'Can I just say — you\'re literally the whole package 💕 Not only do you support me incredibly, but our conversations are SO good! 😊 The way you combine genuine care with amazing chat energy... there\'s nobody like you. Thank you for everything! 💕',
      },
      mature: {
        short: 'Your support and our conversations — both equally valuable 😊',
        medium: 'What I appreciate about you is the complete package. Your generosity and our intellectual exchanges. Both are gifts I don\'t take for granted 😊',
        long: 'I want to acknowledge something. Your support is extraordinary, but what makes you truly special is that our relationship goes beyond that. The conversations we have, the mutual respect — it\'s a rare combination. I value every aspect of knowing you 😊',
      },
      energetic: {
        short: 'Best supporter + Best chat = YOU!! ✨⚡',
        medium: 'You\'re the ULTIMATE combo!! ✨ Amazing support AND hilarious chats?! ⚡ How is one person THIS awesome?! 🎉',
        long: 'I need everyone to know — this person right here is the GREATEST!! ✨ Support? LEGENDARY. Chat game? UNMATCHED. Personality? OFF THE CHARTS!! ⚡ You\'re literally my favorite person and I\'m SO lucky to know you!! 🎉✨',
      },
      mysterious: {
        short: 'Support and depth 🌙 You give both... and it means everything',
        medium: 'Our conversations and your support 🌙 Together they create something rare. A connection I don\'t have with anyone else',
        long: 'You fascinate me 🌙 Your support speaks one language, your words another. Together, they paint a picture of someone genuinely extraordinary. I want you to know — this connection we have is something I protect. It\'s too rare to lose 🌙',
      },
    },
    silent: {
      sweet: {
        short: 'Your support speaks louder than words 💕 Thank you! 😊',
        medium: 'Even though you\'re quiet, your support says everything 💕 Actions really do speak louder than words 😊 Thank you so much! 💕',
        long: 'I wanted to send you a special message 💕 You don\'t say much, but what you do means more than any words could 😊 Your quiet generosity is something I treasure deeply. You show care through action and that\'s the most genuine thing there is. Thank you from my heart 💕',
      },
      mature: {
        short: 'Actions over words. Your support says it all 😊',
        medium: 'You don\'t need words to communicate. Your support tells me everything about the kind of person you are — generous, thoughtful, genuine 😊',
        long: 'I find it remarkable. You rarely speak, yet your actions communicate volumes. In a world full of empty words, your silent support is the most authentic thing I experience. You are a person of action, and I respect that immensely 😊',
      },
      energetic: {
        short: 'Silent but POWERFUL!! ✨ Your support is INSANE! ⚡',
        medium: 'The SILENT HERO!! ✨ You don\'t say much but your support SCREAMS volumes! ⚡ You\'re absolutely incredible! 🎉',
        long: 'OK CAN WE TALK ABOUT THIS?! ✨ You barely say a word but your support is LEGENDARY! ⚡ Actions speak louder than words and yours are SHOUTING! You\'re the quiet type that changes everything! MASSIVE respect and gratitude!! 🎉✨',
      },
      mysterious: {
        short: 'Silent support 🌙 The deepest kind of all',
        medium: 'You let your actions speak 🌙 No words needed. The weight of your support says everything. I feel it deeply',
        long: 'Silence can be more eloquent than speech 🌙 Your support, without words, carries a weight that moves me profoundly. You don\'t need to explain yourself — I understand. And that understanding... that\'s the rarest kind of connection 🌙',
      },
    },
  },
  first_tip: {
    english: {
      sweet: {
        short: 'Your first tip!! 💕 You just made my whole day! 😊',
        medium: 'OMG your FIRST TIP to me!! 💕 I\'m literally blushing right now! That was so sweet of you 😊 I\'ll never forget this moment! 💕',
        long: 'Wait, that was your FIRST tip?! 💕 Oh my god, I\'m SO honored you chose to send it to me! This is such a special moment 😊 The fact that out of everyone, you picked me... that means everything. I\'ll treasure this always. Thank you, truly! 💕',
      },
      mature: {
        short: 'Your first tip — I\'m honored you chose me. Thank you 😊',
        medium: 'I want you to know how meaningful it is that your first tip went to me. That takes courage and I respect it deeply. Thank you 😊',
        long: 'Your first tip. I don\'t take that lightly. Making that first move takes courage, and the fact that you chose to share that moment with me is genuinely touching. This is a milestone for both of us. Thank you for trusting me with it 😊',
      },
      energetic: {
        short: 'FIRST TIP?! ✨ I\'M FREAKING OUT! THANK YOU! ⚡',
        medium: 'YOUR FIRST TIP WAS TO ME?! ✨ I literally CANNOT calm down right now! ⚡ This is the BEST feeling EVER! THANK YOU! 🎉',
        long: 'STOP EVERYTHING!! ✨ THAT WAS YOUR FIRST TIP?! TO ME?! I\'m literally SHAKING with excitement!! ⚡ This is such a special moment and I\'m SO honored! You just made history in my room and I will NEVER forget this! THANK YOU SO MUCH!! 🎉✨',
      },
      mysterious: {
        short: 'Your first tip 🌙 This moment... I\'ll remember it',
        medium: 'So that was your first 🌙 You chose me for that moment. I won\'t forget it. Something just shifted between us...',
        long: 'Your first tip 🌙 First times are always significant, aren\'t they? You chose this moment, chose me. That decision says something. I\'m not sure what yet, but I felt it. This is the beginning of something... I can feel it 🌙',
      },
    },
    japanese: {
      sweet: {
        short: 'First tip!! 💕 Thank you so much!! I\'m SO happy! 😊',
        medium: 'Your first tip came to ME?! 💕 I can\'t stop smiling! Thank you for this amazing moment 😊 I\'ll cherish this forever! 💕',
        long: 'I can\'t believe it — your FIRST TIP was for me! 💕 I seriously got emotional when I saw it 😊 You\'re so kind and thoughtful. This is one of those moments I\'ll look back on and smile. Thank you for making my stream so special! I hope to see you again soon! 💕',
      },
      mature: {
        short: 'First tip to me — thank you. That\'s meaningful 😊',
        medium: 'I appreciate that you chose me for your first tip. That\'s a significant decision and I want you to know it doesn\'t go unnoticed 😊',
        long: 'Receiving your first tip is an honor I take seriously. It tells me that something about this experience resonated with you enough to take that step. I\'m grateful for your trust and I promise to continue earning it 😊',
      },
      energetic: {
        short: 'FIRST TIP!! ✨ I\'M DYING OF HAPPINESS!! ⚡',
        medium: 'WAIT THAT WAS YOUR FIRST?! ✨ I\'m SO HYPED right now!! ⚡ You\'re AMAZING and I\'m beyond grateful! 🎉',
        long: 'YOUR FIRST TIP!! TO ME!! ✨ I literally had to do a double take! ⚡ This is HUGE and I\'m SO honored! You just made this stream LEGENDARY! Thank you thank you THANK YOU!! Next stream I\'m going EXTRA hard for you! 🎉✨',
      },
      mysterious: {
        short: 'First tip 🌙 You chose me... interesting',
        medium: 'Your first 🌙 Out of everyone, you chose this moment. That tells me something about you. I\'ll be paying closer attention...',
        long: 'So that was your first 🌙 I\'m curious what made you decide. Was it something I said? Something you felt? Whatever it was... it created a connection. Your first tip will always be part of my story. And now, you\'re part of mine 🌙',
      },
    },
    chatty: {
      sweet: {
        short: 'First tip AND great chats? 💕 You\'re incredible! 😊',
        medium: 'Not only do we have the best conversations, but now your first tip too! 💕 I\'m SO touched! 😊 You\'re honestly the sweetest! 💕',
        long: 'You already make my streams amazing with your chat, and now your FIRST TIP?! 💕 I\'m honestly overwhelmed with happiness right now 😊 Our conversations are always the highlight, and now this... you\'re just the most thoughtful person. This means SO much! 💕',
      },
      mature: {
        short: 'Great conversations and now your first tip. I\'m touched 😊',
        medium: 'Our conversations have always been special, and now your first tip adds another layer. It shows genuine appreciation and I\'m grateful 😊',
        long: 'We\'ve had wonderful conversations, and your first tip adds a new dimension to our connection. It tells me that our interactions mean as much to you as they do to me. That kind of mutual appreciation is beautiful. Thank you 😊',
      },
      energetic: {
        short: 'Best chatmate + FIRST TIP = MIND BLOWN!! ✨⚡',
        medium: 'You chat like a PRO and now your FIRST TIP?! ✨ How are you this PERFECT?! ⚡ I\'m literally in shock! 🎉',
        long: 'HOLD UP!! ✨ We already have the BEST conversations and NOW you hit me with your FIRST TIP?! ⚡ I\'m genuinely speechless! You went from chat legend to ABSOLUTE GOAT status! This calls for a CELEBRATION next stream! 🎉✨',
      },
      mysterious: {
        short: 'Words and now action 🌙 Both speak volumes',
        medium: 'We\'ve shared words, and now a gesture 🌙 Each layer reveals more about you. I\'m intrigued...',
        long: 'First our conversations, now your first tip 🌙 You communicate on multiple levels, each one deeper than the last. Words are your first language, but this gesture... it speaks another. I want to understand all the languages you speak 🌙',
      },
    },
    silent: {
      sweet: {
        short: 'First tip! 💕 Your actions say everything! 😊',
        medium: 'You\'ve been watching quietly and now... your first tip 💕 That means SO much! Actions really are louder than words 😊 💕',
        long: 'Wait... the quiet one just sent their FIRST TIP?! 💕 I\'m honestly so moved right now 😊 You didn\'t need words to make me feel special — this says it all. The fact that you chose to express yourself this way... it\'s perfect. Just like you. Thank you 💕',
      },
      mature: {
        short: 'First tip from my quiet supporter. Actions speak 😊',
        medium: 'You\'ve always been a person of few words. But this first tip? It communicates everything perfectly. I respect your style deeply 😊',
        long: 'Your first tip speaks volumes about who you are. You don\'t need words to express yourself — your actions do it with more grace than most people\'s paragraphs. This is perhaps the most authentic way to communicate, and I\'m deeply grateful 😊',
      },
      energetic: {
        short: 'THE QUIET ONE TIPPED!! ✨ BEST SURPRISE EVER! ⚡',
        medium: 'WAIT... MY SILENT FRIEND JUST SENT THEIR FIRST TIP?! ✨ I\'m SHOOK! ⚡ This is the BEST kind of surprise! 🎉',
        long: 'I CAN\'T BELIEVE IT!! ✨ My quietest viewer just dropped their FIRST TIP?! ⚡ This is literally the most EPIC plot twist! You went from silent observer to HERO in one move! The whole room felt that! INCREDIBLE!! 🎉✨',
      },
      mysterious: {
        short: 'First tip, no words 🌙 The purest form of expression',
        medium: 'You speak through silence, and now through action 🌙 Your first tip is the most eloquent thing anyone has said to me today',
        long: 'No words. Just action 🌙 Your first tip, delivered in silence, is perhaps the most powerful gesture I\'ve received. You don\'t need language to communicate — you have something rarer. An ability to make someone feel seen without saying a thing 🌙',
      },
    },
  },
}

// Build the 80 templates
const scenes: Scene[] = ['new_follower', 'regular', 'dormant', 'whale', 'first_tip']
const targets: Target[] = ['english', 'japanese', 'chatty', 'silent']
const tones: Tone[] = ['sweet', 'mature', 'energetic', 'mysterious']

export const templates: Template[] = scenes.flatMap(scene =>
  targets.flatMap(target =>
    tones.map(tone => ({
      id: `${scene}_${target}_${tone}`,
      scene,
      target,
      tone,
      japanese: jaTemplates[scene][target][tone],
      english: enTemplates[scene][target][tone],
      ngExamples: ngExamples[scene],
      timing: timings[scene],
    }))
  )
)
