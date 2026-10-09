export interface Property {
  id: string;
  title: string;
  type: 'شقة' | 'فيلا' | 'أرض' | 'مكتب' | 'شاليه' | 'دوبلكس';
  purpose: 'بيع' | 'إيجار';
  priceSYP: number;
  priceUSD: number;
  isNegotiable: boolean;
  featured: boolean;
  status: 'متاح' | 'مباع' | 'قيد المراجعة';
  location: string;
  city: 'طرطوس' | 'دمشق' | 'صافيتا' | 'الدريكيش' | 'الشيخ بدر' | 'القدموس' | 'حلب';
  neighborhood: string;
  beds: number;
  baths: number;
  area: number; // m²
  floor: string;
  buildingAge: string;
  orientation: string;
  finishing: 'ممتاز / سوبر لوكس' | 'جيد / تشطيب عادي' | 'عظم / بدون تشطيب';
  furnished: boolean;
  ownership: 'طابو أخضر' | 'حكم محكمة' | 'وكالة عامة';
  images: string[];
  mainImageIndex: number;
  date: string;
  description: string;
  tags: string[];
  amenities: string[];
  viewsCount: number;
  callsCount: number;
  whatsappCount: number;
  ownerName: string;
  ownerPhone: string;
  coordinates: { lat: number; lng: number };
}

export interface AdminUser {
  id: string;
  name: string;
  initials: string;
  role: 'مستثمر' | 'وسيط' | 'مشرف' | 'مدير';
  status: 'نشط' | 'معلق' | 'محظور';
  propertiesCount: number;
  phone: string;
  joinDate: string;
}

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'SK-102',
    title: 'فيلا فاخرة في يعفور - إطلالة بانورامية',
    type: 'فيلا',
    purpose: 'بيع',
    priceSYP: 500000000,
    priceUSD: 335000,
    isNegotiable: true,
    featured: true,
    status: 'متاح',
    location: 'دمشق، يعفور، البوابة الرابعة',
    city: 'دمشق',
    neighborhood: 'يعفور - البوابة الرابعة',
    beds: 4,
    baths: 3,
    area: 350,
    floor: 'الأول',
    buildingAge: 'جديد (أول سكن)',
    orientation: 'قبلي شرقي',
    finishing: 'ممتاز / سوبر لوكس',
    furnished: true,
    ownership: 'طابو أخضر',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBhaey_WI2c_JH2f8HCAESb6ht9SYNqjqKghzkhyKB06SbGXh3a8EdfPYhHkJYCzh4s2DNy3vSnkNsZkXyrs17xpK8aJiI0taqGT1WueFTmogIIKL23PSgSDMHTR7RX-7ftCuy3pBhT70CfR6qzTCyakL2lJi4T_RtJguJMzVol0dKUm058PuACzSmIRyxy43MXrZ3b5rOq4mjmH_WEmP_ehzKt9cW_FWWSTT1OLzK687nEEYII4oqJF_11dsTpfY9cTmQ0En-gqCec',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAhdEPvVtO9dT-Hbk3xZkXCKnzkYdJ1yhT0buTe7vmTMHLEMB-gm7lwf6L2fFak_1GQfEjYm95CEzat1TKTJJDaLnuP2SFX4-3H3UvDGECGDZZg_tZcEHzyA2xxzVumO6JqAtnT-nDJVT4zbRVfCW7FPtvBmXGXyRgdxfArNCFkxzRyV76offHDqsfvGGQs7VdGqJ86XPulDY03rBC85SE8EAUoNyIpPUGC3Bk9uVwQQSpoYDuOPlB0tUpXZQIk24zFnYlFJ5Ajpo4I',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBqV0gRK6N3IQh3OAcBaMZ2YQF3u0brPraOoXK-2WAEEuFF2Yoq6928o7LJwLgDPFAZavP9T9ioNHVfj1VuYdNiNZ7Ik9iwCIuOYcrpO_gIifTh_DoAN3nn4Rsil6kCjIzMfVDE2eZA0YOaQmUrmaK1mJOryCd3bLJvXRUVUJce1fGZJCGbYNMk1OrTU-9Iog3WozUC3ub9NAR1nACTBcpHUWLbxWnoj-gaWq0CC8huA_gKs3Mazl1gNbcOl8U02hVEKapaWTha41_4',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDcuFQu205WtG2XunG7vJ9RiafrksIkx9MPzhZWEcxGdO9XjEoz5QWZmIHgSkBvCr2q-dBMU1P6pa-AXFcr23WyzLQDcXMLgknpwKtGBR_p7xjhizQY1zdGy3reAi-r0imXV2hzUpT7sfgvbH4PXFOLULseTEVbPjz4Esa7d7vambfLugehaNzoEmOr_VPCUGWYvSLXHMB9egoY1WQhXyDZZ1f42qzP3pJQCaa0AknqLBRhOUnTbjKSFfl0LiNhgGShDyv_c0u7qk3-'
    ],
    mainImageIndex: 0,
    date: '12 أكتوبر 2024',
    description:
      'نقدم لكم هذه الفيلا الاستثنائية في قلب يعفور، بتصميم عصري يجمع بين الفخامة والخصوصية. تتميز الفيلا بتشطيبات سوبر ديلوكس، وأرضيات رخامية، ونظام تكييف مركزي متكامل. تحتوي على حديقة واسعة مع مسبح خاص ومنطقة جلسات خارجية مظللة. الموقع استراتيجي وقريب من كافة الخدمات الرئيسية في المنطقة، مع ضمان الخصوصية التامة والإطلالة الخلابة على الجبال المحيطة. تم استخدام أفضل المواد في البناء والعزل الحراري والمائي.',
    tags: ['2400 سهم', 'طابو أخضر', 'جاهز للسكن', 'إطلالة بحرية', 'مسبح خاص'],
    amenities: ['مصعد خاص', 'مرآب سيارات', 'حديقة خاصة', 'حراسة 24/7', 'تكييف مركزي', 'مسبح خاص'],
    viewsCount: 1420,
    callsCount: 89,
    whatsappCount: 132,
    ownerName: 'المهندس وسيم صقر',
    ownerPhone: '+963 932400182',
    coordinates: { lat: 33.5138, lng: 36.2765 }
  },
  {
    id: 'SL-2041',
    title: 'شقة فخمة مطلة على الكورنيش البحري',
    type: 'شقة',
    purpose: 'بيع',
    priceSYP: 450000000,
    priceUSD: 245000,
    isNegotiable: true,
    featured: true,
    status: 'متاح',
    location: 'مدينة طرطوس، حي الكورنيش',
    city: 'طرطوس',
    neighborhood: 'الكورنيش البحري',
    beds: 3,
    baths: 2,
    area: 180,
    floor: 'الرابع',
    buildingAge: 'جديد (أول سكن)',
    orientation: 'غربي بحري',
    finishing: 'ممتاز / سوبر لوكس',
    furnished: false,
    ownership: 'طابو أخضر',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDAv-Xm-emEuePjNIOW-u3enbTluL8Se4T9n2WP-DAd2ri01RmSlYzrQI1eNHTUhee5SlO9J0dxfrluqvh2568DZZQevuPLzlYkPnf66H9KPiybPq4gx_yDIZA7XyGRRL_3BOJw1TW2heEGsN76En68AHsXb8knhxetbPwOTW_NIkz0lDB5T5BxGcA9ERXSXs0NLtWTb7M0JPirQnzV72yzBU_CUS3xDaR1xG8GdMSkG1EBkCo0TZcIbyNrVvIF5Lv_q1_ZlqqrHXMS',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBqV0gRK6N3IQh3OAcBaMZ2YQF3u0brPraOoXK-2WAEEuFF2Yoq6928o7LJwLgDPFAZavP9T9ioNHVfj1VuYdNiNZ7Ik9iwCIuOYcrpO_gIifTh_DoAN3nn4Rsil6kCjIzMfVDE2eZA0YOaQmUrmaK1mJOryCd3bLJvXRUVUJce1fGZJCGbYNMk1OrTU-9Iog3WozUC3ub9NAR1nACTBcpHUWLbxWnoj-gaWq0CC8huA_gKs3Mazl1gNbcOl8U02hVEKapaWTha41_4'
    ],
    mainImageIndex: 0,
    date: '10 أكتوبر 2024',
    description:
      'شقة راقية على الخط الأول للكورنيش البحري بمدينة طرطوس، إطلالة مفتوحة ومباشرة على البحر والغروب الساحر. إكساء هندسي فائق الجودة، صالون فسيح وتراس واسع.',
    tags: ['طابو أخضر', 'إطلالة بحرية', 'سوبر ديلوكس'],
    amenities: ['مصعد خاص', 'مرآب سيارات', 'إطلالة بحرية', 'مولدة كهرباء'],
    viewsCount: 2450,
    callsCount: 112,
    whatsappCount: 184,
    ownerName: 'أحمد المنصوري',
    ownerPhone: '+963 992524874',
    coordinates: { lat: 34.8959, lng: 35.8867 }
  },
  {
    id: 'SL-2042',
    title: 'فيلا مودرن في ضاحية المجد',
    type: 'فيلا',
    purpose: 'بيع',
    priceSYP: 780000000,
    priceUSD: 520000,
    isNegotiable: true,
    featured: true,
    status: 'متاح',
    location: 'الدريكيش، المشيرفة',
    city: 'الدريكيش',
    neighborhood: 'المشيرفة',
    beds: 5,
    baths: 4,
    area: 450,
    floor: 'طابقين + روف',
    buildingAge: '1 - 5 سنوات',
    orientation: 'مفتوح 4 جهات',
    finishing: 'ممتاز / سوبر لوكس',
    furnished: true,
    ownership: 'طابو أخضر',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA_SENlELBTDY8RvjefQPpAHE0o9Zc1v2NyB6nXsSx3917FQwri7qmDePq4may8xMgLBGxyfXz3-OeaWvZV0uXB_rG6lgpC9aNhhW950NImwmn3R2_0Abo89THeuUiLmdeeAptJjJm6tHGwXJyOWfZxTdU17JPiVJ6BfgetdZGNiSn5SrkofFaLO515r2iSCTq_J8TdmSYiPKcWhTU3I59BGXNiF3s0Vq8srDJvM5QqGPlRp4-eXnHVEpeuwCIQjNY0hSOq3LiOK4EP',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBaHgzefzs2hB6wKkZ6-zqoZ006IJBSiw7zhjuqWulFH7lItrC2Sdl4JFN_QZDNggDrEaVbykaLxncAKb5dXPhgmTt85xJfTL564pJZ7KLs2VdA-AXlJEITflOS5-rHW-aecJDa9FrmSfxGZhdRGqjD2NeKEhI802YqN-HEaWyHA40uAb7zo4d_Ow6qBk1gJf9XTZ9U1Y4nyvSwBnKwn8I35ZNO24wmqfurltn4pU2s88y8ldXU-xZ765Zp9q8qk2dEdIygu7IJcN3O'
    ],
    mainImageIndex: 0,
    date: '08 أكتوبر 2024',
    description:
      'فيلا جبلية فاخرة تتربع على مرتفعات الدريكيش بإطلالة خلابة على الطبيعة والجبال. مسبح إنفينيتي خارجي، حدائق منسقة، وتجهيزات طاقة شمسية كاملة.',
    tags: ['مسبح خاص', 'طابو أخضر', 'طبيعة جبلية'],
    amenities: ['مسبح خاص', 'حديقة خاصة', 'طاقة شمسية', 'مرآب لـ 3 سيارات'],
    viewsCount: 1890,
    callsCount: 64,
    whatsappCount: 92,
    ownerName: 'الدكتور طارق حمود',
    ownerPhone: '+963 932400182',
    coordinates: { lat: 34.8989, lng: 36.1389 }
  },
  {
    id: 'SL-2043',
    title: 'دوبلكس عصري تشطيب سوبر ديلوكس',
    type: 'دوبلكس',
    purpose: 'بيع',
    priceSYP: 260000000,
    priceUSD: 175000,
    isNegotiable: false,
    featured: false,
    status: 'متاح',
    location: 'صافيتا، المشروع السادس',
    city: 'صافيتا',
    neighborhood: 'المشروع السادس',
    beds: 3,
    baths: 3,
    area: 220,
    floor: 'الرابع والخامس',
    buildingAge: 'جديد (أول سكن)',
    orientation: 'شرقي قبلي',
    finishing: 'ممتاز / سوبر لوكس',
    furnished: false,
    ownership: 'طابو أخضر',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuByals_eu-LP3Wt_eeVKbQOFf1TPKMsMUdh6lNKUrj1aIP4tJ8otFe29DoYyD2cSUeYJbXW6xBWUIUacEB3qWFAOsbUdDMMz3_zMpwI8h2jF93tLs7OdF5a4iO7TNB8xGotG7DV9M0vuy758LNQ1t5I0qvkGSdTrwlTbTPbP9EgS8khoNMxxc-aVVPDAlVpPOFT3ad7InMQ8I2JGAMMHHPOfPg5yO1HXKkKeZtvFK5hsOZehwCR5cIDrlhQ1J4uAVbg19lDqnoM4hGr',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAQuDO00q_A49Nir57wxF4VaFMDAHv5LK_Ot_J4Y_rCwq-FnhrD7Q87KpZ92aZV1CTKV3CtTIWL_txnaYKX2SxdtV6O0uDhyey9AOOvE1tevT_ijeu6BYSpr8yLgIMZi3uZcB8LDnanunvwLU9rT15AZq7b7YdK7AD1577alDc6534THHHpxW_IjmxWjCaHQLDdekMi_TbLduuNopQXMLlSmcOUEi7n96DZeQjRaeBm5CecuuchYGvZcXWA_PSDHB7DVX9KBS73l_Uy'
    ],
    mainImageIndex: 0,
    date: '05 أكتوبر 2024',
    description:
      'دوبلكس حديث بأسقف مرتفعة ونوافذ بانورامية بإطلالة على قلعة صافيتا التاريخية والطبيعة المحيطة. سلم داخلي بتصميم عصري من الخشب والحديد المشغول.',
    tags: ['دوبلكس', 'طابو أخضر', 'إطلالة على القلعة'],
    amenities: ['مصعد خاص', 'تراس كبير', 'عزل حراري', 'تدفئة مركزية'],
    viewsCount: 940,
    callsCount: 42,
    whatsappCount: 71,
    ownerName: 'مكتب سكاي لاند - صافيتا',
    ownerPhone: '+963 932400182',
    coordinates: { lat: 34.8211, lng: 36.1189 }
  },
  {
    id: 'SL-1092',
    title: 'مكتب تجاري في قلب المدينة',
    type: 'مكتب',
    purpose: 'بيع',
    priceSYP: 585000000,
    priceUSD: 390000,
    isNegotiable: true,
    featured: false,
    status: 'متاح',
    location: 'الشيخ بدر، شارع الثورة',
    city: 'الشيخ بدر',
    neighborhood: 'وسط المدينة - الشارع العام',
    beds: 4,
    baths: 2,
    area: 110,
    floor: 'الثاني',
    buildingAge: '1 - 5 سنوات',
    orientation: 'واجهة تجارية',
    finishing: 'ممتاز / سوبر لوكس',
    furnished: true,
    ownership: 'طابو أخضر',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAwkcrNqHV-hbVKrTi_GuIySX8Gn9zDR4cqdARkT5VESILly3HQVGfh8Vn1vvY0w_ns9W8rldqjt5wHL7dVBjyEhaCWkjW-3IeY5QvlNZWq8qnd1afiuUX6XmM5sI0kkeDVcujsMo9GWG5_acUdpJCPesrhGa-0pf-172t3A51pQ7JATR4GD1z79qRRXqiEBOU1DgW0h6OYtaWeFeYAizBJHyZZuy2rHQRULKttukMSrfYl47i6kcswm5AquI4bT_E0i17l8td1Qi9t',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDsPd7S06KQiuopUqUjBxLXCLaqU-_wB2c4PRUbpNsFGiKdZiYhD_Kp2bH2eGj0ndfFpcBBUk9MqQ2a7ssu5iosNxdeZnUfS7my13KqIRdByUv3dEFVATIkBZsevPOJgLsFQoAoh2fzPWiGn7DfssESBpSP6R9I6PKzT0H0cUK8YzfDz77FhDgHL4C1MM5u08vOTpLJ0O3MSK3FVNJLuDVPIzNrUSdLxqEGVLYDZ6liPKa_xvADcuTcB3MYQuN5RJK23CBW4AQ3KY1m'
    ],
    mainImageIndex: 0,
    date: '02 أكتوبر 2024',
    description:
      'مكتب تجاري مجهز بالكامل يصلح لمقر شركة، عيادة طبية متطورة، أو مكتب هندسي واستشاري. ديكورات خشبية عصرية وتمديدات شبكة إنترنت وأمان عالية.',
    tags: ['تجاري', 'طابو أخضر', 'جاهز للعمل'],
    amenities: ['مصعد خاص', 'مكيفات', 'شبكة ألياف ضوئية', 'كاميرات مراقبة'],
    viewsCount: 1120,
    callsCount: 51,
    whatsappCount: 68,
    ownerName: 'المهندس رامي عثمان',
    ownerPhone: '+963 932400182',
    coordinates: { lat: 34.9822, lng: 36.0889 }
  },
  {
    id: 'SL-1093',
    title: 'شاليه بحري مخدم بالكامل - شاطئ الأحلام',
    type: 'شاليه',
    purpose: 'إيجار',
    priceSYP: 1200000,
    priceUSD: 80,
    isNegotiable: false,
    featured: true,
    status: 'متاح',
    location: 'طرطوس، شاطئ الأحلام',
    city: 'طرطوس',
    neighborhood: 'شاطئ الأحلام',
    beds: 2,
    baths: 1,
    area: 120,
    floor: 'أرضي مع حديقة',
    buildingAge: '1 - 5 سنوات',
    orientation: 'غربي بحري',
    finishing: 'ممتاز / سوبر لوكس',
    furnished: true,
    ownership: 'طابو أخضر',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-nMKr0f5SydaKkw2nKY3BuuwGBMRsvpu1eXgChEhsQUxIAWCFUyLUjQ6FxtJmGWr_VlEFHlV_fTR9gdvyD--NuaI01N4I2WxCg92O4wDqayGcOeKMWjaqF0CvMpCwMjnACPzuL-ohS-eteZ9T96j8e8WG0wnoAI8dInxFTA9KY5EiFfI-x_Ql4wWsR4KNIF09e0slDzCbe-8bRwRtXm7dYPow1hhWchQY7arpVqWDY4ei10kJqS3-mS6NBrUwnB6Idz7q00wUeEGk'
    ],
    mainImageIndex: 0,
    date: '28 سبتمبر 2024',
    description:
      'شاليه سياحي بإطلالة ساحرة ومباشرة على الرمال الذهبية في شاطئ الأحلام بطرطوس. حديقة شاطئية خاصة ومسبح مشترك ومنطقة ألعاب أطفال.',
    tags: ['للإيجار', 'شاليه', 'إطلالة بحرية'],
    amenities: ['حديقة خاصة', 'مفروش بالكامل', 'تكييف', 'حراسة شاطئية'],
    viewsCount: 3100,
    callsCount: 180,
    whatsappCount: 240,
    ownerName: 'سكاي لاند للضيافة',
    ownerPhone: '+963 992524874',
    coordinates: { lat: 34.8821, lng: 35.8791 }
  },
  {
    id: 'SL-3301',
    title: 'أرض زراعية واستثمارية - ريف طرطوس',
    type: 'أرض',
    purpose: 'بيع',
    priceSYP: 320000000,
    priceUSD: 210000,
    isNegotiable: true,
    featured: false,
    status: 'متاح',
    location: 'ريف طرطوس، الساحل',
    city: 'طرطوس',
    neighborhood: 'سهل عكار - ريف طرطوس',
    beds: 0,
    baths: 0,
    area: 4200,
    floor: 'أرضي',
    buildingAge: 'أرض فضاء',
    orientation: 'مفتوح',
    finishing: 'عظم / بدون تشطيب',
    furnished: false,
    ownership: 'طابو أخضر',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDUuBOvEi8AyjhRkoenCQYGoGFJ0emDHQ2iDhS5EmhoznREvC3QonRmd4mg2lfsYol4EmlXm4uVLvAGysSz5cwv8kjRaxepJloSBelFaTnm-eiXrfcwQtXKhZWhz5aj-pugq1GdPFsGgcqmfcxzKDlY0owqb0i0Mni2f7YeOHLsHWU3_-SlonboZiahFvussRUJIvYxKF1xCelXYja2c0T5tIbfkb0d-9nL60hpF1vMDF3QU3ixSRY4Pp2o_xXZ-qAl0y1LbQNK0YVT'
    ],
    mainImageIndex: 0,
    date: '15 سبتمبر 2024',
    description:
      'قطعة أرض زراعية وسياحية متميزة مروية بالكامل وقريبة من الشارع الرئيسي وطريق دمشق-طرطوس السريع. صالحة لإنشاء منتجع ريفي أو فيلا فخمة مع مزارع حمضيات.',
    tags: ['أرض', 'طابو أخضر', 'استثمار ريفي'],
    amenities: ['بئر ماء ارتوازي', 'طريق معبد', 'كهرباء واصلة'],
    viewsCount: 820,
    callsCount: 38,
    whatsappCount: 45,
    ownerName: 'أبو فراس المحمود',
    ownerPhone: '+963 932400182',
    coordinates: { lat: 34.8255, lng: 35.9521 }
  },
  {
    id: 'SL-PENDING-1',
    title: 'بنتهاوس فاخر - دمشق المزة',
    type: 'شقة',
    purpose: 'بيع',
    priceSYP: 850000000,
    priceUSD: 560000,
    isNegotiable: true,
    featured: false,
    status: 'قيد المراجعة',
    location: 'المزة، دمشق',
    city: 'دمشق',
    neighborhood: 'المزة فيلات غربية',
    beds: 4,
    baths: 3,
    area: 280,
    floor: 'العاشر (روف)',
    buildingAge: 'جديد (أول سكن)',
    orientation: 'إطلالة بانورامية',
    finishing: 'ممتاز / سوبر لوكس',
    furnished: true,
    ownership: 'طابو أخضر',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAb_rDMDj7crUFh5FxoTTWfIfyh_POvTMNFVYwUBQewUv01uY3s3sGNr9T-pvFvKb1f223fkIVhKuVMAC9qAE0vQh6Van1UnXcdLeHWluZMsFtx7rHsO0SZNNm37Lo1v8Py-kidkHmpe9ZJfMQKcV5EP7xYcFYXX61j1Z49jPBdLKukeh8Qz0QT8jBbWjoXYTPbed0GBtSjfbxC2dDtZBSgWyS7gYM0XVLXjJ4Efiru6EM1wqoCAiGybQwSRpI0Sl1GguWciEOFR_Ks'
    ],
    mainImageIndex: 0,
    date: 'اليوم',
    description: 'بنتهاوس فاخر بتشطيبات راقية في المزة فيلات غربية بإطلالة مميزة على دمشق وجبل قاسيون.',
    tags: ['بانتظار المراجعة', 'بنتهاوس', 'طابو أخضر'],
    amenities: ['مصعد خاص', 'تراس 100م²', 'موقفين سيارات', 'طاقة شمسية'],
    viewsCount: 45,
    callsCount: 3,
    whatsappCount: 7,
    ownerName: 'سامر الجابري',
    ownerPhone: '+963 944123456',
    coordinates: { lat: 33.4988, lng: 36.2512 }
  },
  {
    id: 'SL-PENDING-2',
    title: 'مركز تجاري - حلب السليمانية',
    type: 'مكتب',
    purpose: 'بيع',
    priceSYP: 950000000,
    priceUSD: 620000,
    isNegotiable: true,
    featured: false,
    status: 'قيد المراجعة',
    location: 'السليمانية، حلب',
    city: 'حلب',
    neighborhood: 'السليمانية',
    beds: 6,
    baths: 3,
    area: 320,
    floor: 'الأول التجاري',
    buildingAge: 'جديد (أول سكن)',
    orientation: 'واجهة رئيسية',
    finishing: 'ممتاز / سوبر لوكس',
    furnished: false,
    ownership: 'طابو أخضر',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCFkmYwRGvNAe6TSoM-6EHjvr10QiRA1gxjtTn7GBjAfrMFpS6iPeSbDFMikGytpcnPzc-QQAi7nuxlW3JOPD5fSJgIZgy8FWSyQj9FsgzNjqq17eJlU0uiAhUp3EuE-puQ_LdXcv3fxGBlM5_WnBtm0Uw0qAPS5E_JDcqIrlPIFtNS-WK3FJhm0BpMNGbPixsHsBdyzhjyBXPT6j3FEOO9_m09O2g9nvVDiSgXkdUNZBCYjCL8QnKk7fk1tuip8ey0Ozszkp71QFsb'
    ],
    mainImageIndex: 0,
    date: 'أمس',
    description: 'مقر تجاري متكامل في حلب يصلح لبنك أو شركة استثمارية كبرى.',
    tags: ['بانتظار المراجعة', 'تجاري', 'طابو أخضر'],
    amenities: ['مصاعد متعددة', 'حراسة', 'مولدة خاصة'],
    viewsCount: 32,
    callsCount: 2,
    whatsappCount: 4,
    ownerName: 'شركة النور التجارية',
    ownerPhone: '+963 922987654',
    coordinates: { lat: 36.2166, lng: 37.1611 }
  }
];

export const INITIAL_USERS: AdminUser[] = [
  {
    id: 'U-1',
    name: 'سارة المنصور',
    initials: 'SM',
    role: 'مستثمر',
    status: 'نشط',
    propertiesCount: 6,
    phone: '+963 933112233',
    joinDate: '2023-11-12'
  },
  {
    id: 'U-2',
    name: 'خالد اليوسف',
    initials: 'KY',
    role: 'وسيط',
    status: 'معلق',
    propertiesCount: 14,
    phone: '+963 988445566',
    joinDate: '2024-01-20'
  },
  {
    id: 'U-3',
    name: 'محمد العلي',
    initials: 'MA',
    role: 'مستثمر',
    status: 'نشط',
    propertiesCount: 3,
    phone: '+963 955778899',
    joinDate: '2024-03-05'
  },
  {
    id: 'U-4',
    name: 'المهندس رامي عثمان',
    initials: 'RO',
    role: 'مشرف',
    status: 'نشط',
    propertiesCount: 9,
    phone: '+963 944221100',
    joinDate: '2023-09-15'
  }
];

export const LOCATIONS_LIST = [
  {
    id: 'tartous-city',
    name: 'مدينة طرطوس',
    count: '120+ عقار',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGVou9JXEHxkk02y-yQamL58IYJLR5EewnPGWTS-UKMuzczbeVsmIAueCxD8L_5uisoEFUz3sa5am9HFLJVsdjjlmwPLNj_dU9v4sfsSN6Paz_tGBH5vEbn4fG4QAp_jUlEsJHDXNPxMCdSLqArr82XLh6hyWWNsWmlXOMV85crv3nEs0QmCtED9hevBrsoyua63xcI3Az0Kw5xnrb9uWsRnND38uRedA1FHALWGooKxGBEhkXcreJKONlrczPTQDEaM05qK2r7Dep',
    cityQuery: 'طرطوس'
  },
  {
    id: 'tartous-countryside',
    name: 'ريف طرطوس',
    count: '85+ عقار',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAea3VEpM8tiFfUYxWQFwY30fBgtqfQqMbIT3TZnc1pbdM86BTK81x72ZLlkcCo6mD9vfxZPg4dMDyK7dJCOVOTnIrGsYQsIKHPjDnTOfL0ZRyRGeUgoMihMyc1XKz0Yai1j8_6mhHJMzV4OsPM1Src2aL_u7cbnLg7o-w8VnH0sCB5NYm5N0ZqRoUQICXD14FFWx2c8hD_KX4oinZLJfHJGvP2udHSbbpsj9NudH8qsLirsA6wT7fRGy75BcUDOMBUW34b6Autc0rn',
    cityQuery: 'طرطوس'
  },
  {
    id: 'dreikish',
    name: 'الدريكيش',
    count: '45+ عقار',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhdEPvVtO9dT-Hbk3xZkXCKnzkYdJ1yhT0buTe7vmTMHLEMB-gm7lwf6L2fFak_1GQfEjYm95CEzat1TKTJJDaLnuP2SFX4-3H3UvDGECGDZZg_tZcEHzyA2xxzVumO6JqAtnT-nDJVT4zbRVfCW7FPtvBmXGXyRgdxfArNCFkxzRyV76offHDqsfvGGQs7VdGqJ86XPulDY03rBC85SE8EAUoNyIpPUGC3Bk9uVwQQSpoYDuOPlB0tUpXZQIk24zFnYlFJ5Ajpo4I',
    cityQuery: 'الدريكيش'
  },
  {
    id: 'safita',
    name: 'صافيتا',
    count: '60+ عقار',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-nMKr0f5SydaKkw2nKY3BuuwGBMRsvpu1eXgChEhsQUxIAWCFUyLUjQ6FxtJmGWr_VlEFHlV_fTR9gdvyD--NuaI01N4I2WxCg92O4wDqayGcOeKMWjaqF0CvMpCwMjnACPzuL-ohS-eteZ9T96j8e8WG0wnoAI8dInxFTA9KY5EiFfI-x_Ql4wWsR4KNIF09e0slDzCbe-8bRwRtXm7dYPow1hhWchQY7arpVqWDY4ei10kJqS3-mS6NBrUwnB6Idz7q00wUeEGk',
    cityQuery: 'صافيتا'
  },
  {
    id: 'sheikh-badr',
    name: 'الشيخ بدر',
    count: '30+ عقار',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJV7zp_iv7tib6DCVyoXMLJr0kaXA3tb2bRLAlVa0a_b9VeMDAOyD_W8TPshJgtQOgWL6TfSJ-HnJU4s_EKa02aGK4DAy_OND4d69rOo3xt-CRm9JzKkAdq6aX0kwtwQMyrx69N4KwvQM4uvqIzLInBqWHO1DJ-10z_CbvsgOCTGRWx6AzIhAVtHjNYwhd6xSODMgONLafv3c_c5YZbgtHXycYWVUjRVqId-3XyTjNmv12j80iXC2t_bdquIBGI771pEYNM6CFZL6x',
    cityQuery: 'الشيخ بدر'
  },
  {
    id: 'qadmus',
    name: 'القدموس',
    count: '25+ عقار',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsPd7S06KQiuopUqUjBxLXCLaqU-_wB2c4PRUbpNsFGiKdZiYhD_Kp2bH2eGj0ndfFpcBBUk9MqQ2a7ssu5iosNxdeZnUfS7my13KqIRdByUv3dEFVATIkBZsevPOJgLsFQoAoh2fzPWiGn7DfssESBpSP6R9I6PKzT0H0cUK8YzfDz77FhDgHL4C1MM5u08vOTpLJ0O3MSK3FVNJLuDVPIzNrUSdLxqEGVLYDZ6liPKa_xvADcuTcB3MYQuN5RJK23CBW4AQ3KY1m',
    cityQuery: 'القدموس'
  }
];

export const SERVICES_LIST = [
  { icon: 'shopping_cart', label: 'شراء العقارات' },
  { icon: 'sell', label: 'بيع العقارات' },
  { icon: 'key', label: 'الإيجارات' },
  { icon: 'trending_up', label: 'الاستثمار العقاري' },
  { icon: 'format_paint', label: 'الإكساء الداخلي' },
  { icon: 'construction', label: 'الهدم والبناء' },
  { icon: 'architecture', label: 'استشارات هندسية' },
  { icon: 'photo_camera', label: 'تصوير احترافي' },
  { icon: 'videocam', label: 'إنتاج فيديو عقاري' },
  { icon: 'campaign', label: 'تسويق رقمي' },
  { icon: 'code', label: 'تطوير مواقع' },
  { icon: 'share', label: 'إدارة التواصل الاجتماعي' }
];

export const ADVANTAGES_LIST = [
  { icon: 'verified', title: 'فريق موثوق', desc: 'تحقق قانوني كامل لكل عملية بيع أو شراء.' },
  { icon: 'campaign', title: 'تسويق احترافي', desc: 'أدوات تسويقية متطورة لضمان أسرع وصول.' },
  { icon: 'home_work', title: 'عقارات محققة', desc: 'معاينة دقيقة لكافة العقارات قبل إدراجها.' },
  { icon: 'trending_up', title: 'استشارات استثمارية', desc: 'تحليل مالي وهندسي لضمان أعلى العوائد.' },
  { icon: 'hub', title: 'شبكة واسعة', desc: 'اتصالات محلية ودولية تربطك بالفرص.' },
  { icon: 'speed', title: 'دعم سريع', desc: 'استجابة فورية لكافة الاستفسارات على مدار الساعة.' },
  { icon: 'visibility', title: 'شفافية', desc: 'وضوح تام في الرسوم والإجراءات بدون خفايا.' },
  { icon: 'devices', title: 'تقنيات حديثة', desc: 'جولات افتراضية وتغطية رقمية شاملة.' }
];

export const LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA6XptQbGUFs6HkjkISBObfBaxtSSfYV7Yj7LDX9X-SgD2ql2CJhTQSvvkAfq778d5-q9wbbOngHcriaSOAD_2UPdsvdvVN8xjLWpakITgmV6ekf9wRHF_8Cnh-BPhLGACiQCF7p652eQJy-on2g5Y_cdlF0aV5UiL4jvtUYNXQ3OkaCS9A_D0HF6OjIFY9YtqawvVIE_dh7E3jnx6q0rS8RCqLY9-7Wu87ec3byQzuHJ0LulNR4EyWvjlsRyVGVO6eUkm9oYy2gX9v';
