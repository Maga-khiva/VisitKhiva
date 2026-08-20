export type LocalizedString = {
  kr: string
  en: string
}

export type PricingOption = {
  label: LocalizedString
  amount: string
}

export type Service = {
  id: string
  title: LocalizedString
  description: LocalizedString
  highlights: LocalizedString[]
  image: string
  alt: string
  badge?: LocalizedString
  /** Single displayed price, e.g. "$180 ~ $220 / vehicle" */
  price?: string
  /** Multiple priced packages (Option A / B) */
  pricingOptions?: PricingOption[]
}

export const services: Service[] = [
  {
    id: 'vip-airport-transfer',
    title: {
      kr: 'VIP Airport Transfer',
      en: 'VIP Airport Transfer',
    },
    description: {
      kr: 'Urgench ↔ Khiva 편안한 픽업',
      en: 'Comfortable Urgench ↔ Khiva pickup',
    },
    highlights: [],
    image: 'https://images.pexels.com/photos/17455630/pexels-photo-17455630.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Luxury airport transfer vehicle',
  },
  {
    id: 'korean-guide',
    title: {
      kr: '한국어 전용 가이드',
      en: 'Korean-speaking private guide',
    },
    description: {
      kr: '경험 많은 한국어 가이드 제공',
      en: 'Experienced Korean-speaking guide',
    },
    highlights: [],
    image: 'https://images.unsplash.com/photo-1728281522185-0c06b2d7a598?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Korean guide with tourists at historic site',
  },
  {
    id: 'heritage-stay',
    title: {
      kr: '헤리티지 게스트하우스 & 호텔',
      en: 'Heritage guesthouse & hotel',
    },
    description: {
      kr: '전통 숙소 및 현대 호텔 예약 지원',
      en: 'Traditional stays and modern hotel booking support',
    },
    highlights: [],
    image: 'https://q-xx.bstatic.com/xdata/images/hotel/608x352/889555559.webp?k=fabc3034b10dc1d6af61e9da6cbfb7cd2ac725abbdefd614f1160ad2304797f0&o=?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Uzbek heritage guesthouse courtyard',
  },
  {
    id: 'hanbok-photo-tour',
    title: {
      kr: '한복 & 전통 의상 촬영 투어',
      en: 'Hanbok & traditional costume photo tour',
    },
    description: {
      kr: '전통 의상으로 기념 촬영',
      en: 'Commemorative photos in traditional costume',
    },
    highlights: [],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMEYX_ks4T0pGb7861T9HoOUW-liYOA8ILJ-V0OqYLCKZVcoKsh39GXmw_&s=10?auto=format&fit=crop&w=1200&q=80',
    alt: 'Traditional costume photo tour',
  },
  {
    id: 'desert-fortresses-tour',
    title: {
      kr: '천년의 사막 요새 프라이빗 투어 (토프라 칼라 & 아야즈 칼라)',
      en: 'Ancient Desert Fortresses Private Tour (Toprak Kala & Ayaz Kala)',
    },
    description: {
      kr: '2,000년 전 고대 호레즘 제국의 수도와 웅장한 요새를 단독 차량으로 편안하게 탐험하는 맞춤형 투어입니다.',
      en: 'Explore 2,000-year-old ancient Khorezm fortresses comfortably with a private vehicle and tailored schedule.',
    },
    highlights: [
      {
        kr: '전용 프라이빗 차량 이동 (Private Vehicle)',
        en: 'Private Vehicle Transportation',
      },
      {
        kr: '한국어 역사 가이딩 옵션 (Korean Guide Option)',
        en: 'Korean Language Guide Option',
      },
      {
        kr: '유연한 일정 및 우르겐치 하차 가능 (Urgench Drop-off)',
        en: 'Flexible Schedule & Urgench Drop-off Available',
      },
    ],
    image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1200&q=80',
    alt: 'Ancient desert fortress overlooking the Khorezm landscape',
    badge: { kr: '프라이빗 투어', en: 'Private Tour' },
    pricingOptions: [
      { label: { kr: 'Vehicle Only', en: 'Vehicle Only' }, amount: '$65' },
      { label: { kr: 'Vehicle + Korean Guide', en: 'Vehicle + Korean Guide' }, amount: '$100' },
    ],
  },
  {
    id: 'khiva-bukhara-transfer',
    title: {
      kr: '히바 ➔ 부하라 사막 이동 프라이빗 차량',
      en: 'Khiva to Bukhara Private Desert Transfer',
    },
    description: {
      kr: '기차 표를 구하지 못하셨나요? 키질쿰 사막을 지나 히바에서 부하라까지 단독 차량으로 안전하고 편안하게 이동해 드립니다.',
      en: "Couldn't get train tickets? Travel safely and comfortably through the Kyzylkum Desert directly to your Bukhara hotel.",
    },
    highlights: [
      {
        kr: '에어컨 완비 단독 차량 (AC Private Car)',
        en: 'Air-Conditioned Private Vehicle',
      },
      {
        kr: '사막 휴게소 & 아무다리야 강 전망대 휴식 (Scenic Rest Stops)',
        en: 'Scenic Rest Stops (Amu Darya Viewpoint)',
      },
      {
        kr: '호텔 픽업 ➔ 호텔 드랍 (Door-to-Door Service)',
        en: 'Door-to-Door Hotel Transfer',
      },
    ],
    image: 'https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Private vehicle traveling through desert highway toward Bukhara',
    badge: { kr: '프라이빗 이동', en: 'Transfer' },
    price: '$180 ~ $220 / vehicle (Up to 3-4 passengers)',
  },
]

export const serviceSelectOptions = services.map((service) => ({
  id: service.id,
  label: service.title.kr,
}))
