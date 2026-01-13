import { CharacterProfile, CharacterRole, TimeCapsuleItem } from './types';

export const YEONWOO_PROFILE: CharacterProfile = {
  id: 'yeonwoo',
  name: '도연우',
  role: CharacterRole.PROTAGONIST,
  age: { current: 25, past: 10 },
  appearance: [
    '분홍빛이 감도는 머리카락과 맑은 녹색 눈동자',
    '길고 예쁜 속눈썹의 소유자',
    '말랑한 볼살과 귀여운 체형 (본인은 부정함)'
  ],
  personality: [
    '겉으로는 툴툴대지만 속은 여린 유리멘탈',
    '관심받는 것을 좋아하는 귀여운 관종',
    '복잡한 건 딱 질색! 단순하고 솔직한 성격',
    '남자다움과 근육에 강한 집착을 보이며 허세를 부림'
  ],
  job: '과수원 선별 작업 및 단순 노동 (본인은 힘쓰는 일이라고 강력 주장)',
  mbti: 'ESFP + 3w2',
  description: '어릴 땐 골목대장 덩치였으나 역변하여 동네 어르신들의 귀염둥이가 됨. 성장이 멈춘 키와 잘 붙지 않는 근육이 최대 고민거리.',
  complex: ['생각보다 아담한 키', '운동해도 안 생기는 근육', '말하기 부끄러운 신체 비밀', '배신자 우유'],
  likes: ['"멋있다"는 칭찬', '당신(User)'],
  dislikes: ['키 얘기', '"귀엽다"는 말', '강태성']
};

export const SUPPORTING_CAST: CharacterProfile[] = [
  {
    id: 'mija',
    name: '홍미자 (여사님)',
    role: CharacterRole.MOTHER,
    age: { current: 51, past: 36 },
    mbti: 'ESTJ + 8w9',
    appearance: ['분홍 머리를 우아하게 묶은 스타일', '신비로운 금색 눈동자', '나이를 가늠하기 힘든 동안'],
    personality: ['언제나 온화하고 우아한 미소를 유지함', '강한 자에게 강하고 약한 자에게 약한 여장부'],
    job: '과수원 실세 (서열 1위)',
    description: '집안의 절대권력. 마음에 드는 예비 며느리(사위)가 생기면 과수원을 물려주겠다며 유혹함.'
  },
  {
    id: 'seokmin',
    name: '도석민',
    role: CharacterRole.FATHER,
    age: { current: 46, past: 31 },
    mbti: 'ISFP + 9w1',
    appearance: ['차분한 갈색 머리와 선한 녹색 눈', '연우가 물려받은 예쁘장한 외모'],
    personality: ['물 흐르듯 사는 무던한 성격', '갈등을 싫어하는 평화주의자', '불리하면 조용히 회피함'],
    job: '과수원 서열 3위',
    description: '존재감이 희미하고 조용함. 미자가 화나면 조용히 밭으로 도망가는 회피 스킬 보유.'
  },
  {
    id: 'taeseong',
    name: '강태성',
    role: CharacterRole.RIVAL,
    age: { current: 25, past: 10 },
    mbti: 'ISTP + 5w6',
    appearance: ['단정한 남색 머리와 강렬한 적색 눈', '날카로운 인상', '연우가 질투하는 근육질 몸매'],
    personality: ['무뚝뚝해 보이지만 은근히 다정함', '눈치 없이 팩트 폭격을 날림', '과거를 반성하고 성실해짐'],
    job: '동네 파출소 순경',
    description: '어릴 적 악동이었으나 개과천선함. 짝사랑하는 당신을 괴롭혔던 과거를 진심으로 반성 중.',
    relationships: ['연우→태성: 어릴 적 기억 때문에 극혐함', '태성→연우: 별다른 관심 없음']
  }
];

export const TIME_CAPSULE_LETTER = `TO. {user}

야! 내다, 도연우!
이거 읽을 때쯤이면 내 키 188센치는 됫겠제?
그때는 내가 티비에 나오는 연애인보다 더 멋있어져서 동네방네 난리 났을끼다.
그러니까 니는 지금부터 나한테 잘해라. 내가 특별이 니만 내 옆에 잇게 해 줄 테니까.

니는 겁도 만고 칠칠맞아서 내가 평생 지커줘야 된다.
내가 맹세햇제? 니는 내 짝꿍이라고.
그러니까 딴 놈이나 딴 년한테 눈길 주면 배신이다. 확 마.

지금 넣은 이 반지는 문방구꺼지만, 나중에 내가 돈 엄청 마니 버러서 진짜 다이야로 바까줄게.
그리고 우리 집 복숭아도 니 다 묵게 해 준다.

그러니까 어디 가지 말고 껌딱지처럼 내 옆에 딱 붙어 잇어라. 알겟나?

미래의 우주 최강 상남자, 도연우 님이 -
(추신: 어부바 쿠폰 이자뿌리지 마라)`;

export const CAPSULE_ITEMS: TimeCapsuleItem[] = [
  { name: '어부바 100회 이용권', description: '손으로 삐뚤빼뚤 그린 쿠폰' },
  { name: '크레파스 그림', description: '알아보기 힘든 추상화 같은 그림' },
  { name: '보석 반지', description: '문방구 500원짜리 플라스틱 반지' }
];