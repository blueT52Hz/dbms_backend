import prisma from '~/config/prisma'

interface RegionWithCities {
  region_name: string
  cities: {
    createMany: {
      data: {
        city_name: string
        slug: string
      }[]
    }
  }
}

const regionWithCities: RegionWithCities[] = [
  {
    region_name: 'Đông Bắc Bộ',
    cities: {
      createMany: {
        data: [
          { city_name: 'Hà Giang', slug: 'ha-giang' },
          { city_name: 'Cao Bằng', slug: 'cao-bang' },
          { city_name: 'Bắc Kạn', slug: 'bac-kan' },
          { city_name: 'Tuyên Quang', slug: 'tuyen-quang' },
          { city_name: 'Thái Nguyên', slug: 'thai-nguyen' },
          { city_name: 'Lạng Sơn', slug: 'lang-son' },
          { city_name: 'Quảng Ninh', slug: 'quang-ninh' },
          { city_name: 'Bắc Giang', slug: 'bac-giang' },
          { city_name: 'Phú Thọ', slug: 'phu-tho' }
        ]
      }
    }
  },
  {
    region_name: 'Tây Bắc Bộ',
    cities: {
      createMany: {
        data: [
          { city_name: 'Lào Cai', slug: 'lao-cai' },
          { city_name: 'Điện Biên', slug: 'dien-bien' },
          { city_name: 'Lai Châu', slug: 'lai-chau' },
          { city_name: 'Sơn La', slug: 'son-la' },
          { city_name: 'Yên Bái', slug: 'yen-bai' },
          { city_name: 'Hoà Bình', slug: 'hoa-binh' }
        ]
      }
    }
  },
  {
    region_name: 'Đồng bằng sông Hồng',
    cities: {
      createMany: {
        data: [
          { city_name: 'Hà Nội', slug: 'ha-noi' },
          { city_name: 'Vĩnh Phúc', slug: 'vinh-phuc' },
          { city_name: 'Bắc Ninh', slug: 'bac-ninh' },
          { city_name: 'Hải Dương', slug: 'hai-duong' },
          { city_name: 'Hải Phòng', slug: 'hai-phong' },
          { city_name: 'Hưng Yên', slug: 'hung-yen' },
          { city_name: 'Thái Bình', slug: 'thai-binh' },
          { city_name: 'Hà Nam', slug: 'ha-nam' },
          { city_name: 'Nam Định', slug: 'nam-dinh' },
          { city_name: 'Ninh Bình', slug: 'ninh-binh' }
        ]
      }
    }
  },
  {
    region_name: 'Bắc Trung Bộ',
    cities: {
      createMany: {
        data: [
          { city_name: 'Thanh Hóa', slug: 'thanh-hoa' },
          { city_name: 'Nghệ An', slug: 'nghe-an' },
          { city_name: 'Hà Tĩnh', slug: 'ha-tinh' },
          { city_name: 'Quảng Bình', slug: 'quang-binh' },
          { city_name: 'Quảng Trị', slug: 'quang-tri' },
          { city_name: 'Thừa Thiên Huế', slug: 'thua-thien-hue' }
        ]
      }
    }
  },
  {
    region_name: 'Nam Trung Bộ',
    cities: {
      createMany: {
        data: [
          { city_name: 'Đà Nẵng', slug: 'da-nang' },
          { city_name: 'Quảng Nam', slug: 'quang-nam' },
          { city_name: 'Quảng Ngãi', slug: 'quang-ngai' },
          { city_name: 'Bình Định', slug: 'binh-dinh' },
          { city_name: 'Phú Yên', slug: 'phu-yen' },
          { city_name: 'Khánh Hòa', slug: 'khanh-hoa' },
          { city_name: 'Ninh Thuận', slug: 'ninh-thuan' },
          { city_name: 'Bình Thuận', slug: 'binh-thuan' }
        ]
      }
    }
  },
  {
    region_name: 'Tây nguyên',
    cities: {
      createMany: {
        data: [
          { city_name: 'Kon Tum', slug: 'kon-tum' },
          { city_name: 'Gia Lai', slug: 'gia-lai' },
          { city_name: 'Đắk Lắk', slug: 'dak-lak' },
          { city_name: 'Đắk Nông', slug: 'dak-nong' },
          { city_name: 'Lâm Đồng', slug: 'lam-dong' }
        ]
      }
    }
  },
  {
    region_name: 'Đông Nam Bộ',
    cities: {
      createMany: {
        data: [
          { city_name: 'Bình Phước', slug: 'binh-phuoc' },
          { city_name: 'Tây Ninh', slug: 'tay-ninh' },
          { city_name: 'Bình Dương', slug: 'binh-duong' },
          { city_name: 'Đồng Nai', slug: 'dong-nai' },
          { city_name: 'Bà Rịa - Vũng Tàu', slug: 'ba-ria-vung-tau' },
          { city_name: 'Hồ Chí Minh', slug: 'ho-chi-minh' }
        ]
      }
    }
  },
  {
    region_name: 'Đồng bằng sông Cửu Long',
    cities: {
      createMany: {
        data: [
          { city_name: 'Long An', slug: 'long-an' },
          { city_name: 'Tiền Giang', slug: 'tien-giang' },
          { city_name: 'Bến Tre', slug: 'ben-tre' },
          { city_name: 'Trà Vinh', slug: 'tra-vinh' },
          { city_name: 'Vĩnh Long', slug: 'vinh-long' },
          { city_name: 'Đồng Tháp', slug: 'dong-thap' },
          { city_name: 'An Giang', slug: 'an-giang' },
          { city_name: 'Kiên Giang', slug: 'kien-giang' },
          { city_name: 'Cần Thơ', slug: 'can-tho' },
          { city_name: 'Hậu Giang', slug: 'hau-giang' },
          { city_name: 'Sóc Trăng', slug: 'soc-trang' },
          { city_name: 'Bạc Liêu', slug: 'bac-lieu' },
          { city_name: 'Cà Mau', slug: 'ca-mau' }
        ]
      }
    }
  }
]

const runSeeds = async () => {
  try {
    await Promise.all(
      regionWithCities.map(async (region) => {
        await prisma.region.create({
          data: region
        })
      })
    )
  } catch (error) {}
}

export default runSeeds
