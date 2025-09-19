'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const slides = [
  {
    src: 'https://images.unsplash.com/photo-1585386959984-a4155223168f?q=80&w=1920&auto=format&fit=crop',
    alt: 'Slide 1'
  },
  {
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1920&auto=format&fit=crop',
    alt: 'Slide 2'
  },
  {
    src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1920&auto=format&fit=crop',
    alt: 'Slide 3'
  },
  {
    src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1920&auto=format&fit=crop',
    alt: 'Slide 4'
  },
  {
    src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1920&auto=format&fit=crop',
    alt: 'Slide 5'
  }
]

const Hero = () => {
  return (
    <div
      className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle"
    >
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
        className="h-full hero-swiper"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <img
              src={s.src}
              alt={s.alt}
              className="h-full w-full object-cover select-none"
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scoped styles to make bullets and arrows blue */}
      <style jsx global>{`
        .hero-swiper .swiper-pagination-bullet {
          background: #2563eb; /* blue */
          opacity: 1;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background: #1d4ed8; /* darker blue when active */
        }
        .hero-swiper .swiper-button-prev,
        .hero-swiper .swiper-button-next {
          color: #2563eb; /* blue arrows */
        }
      `}</style>
    </div>
  )
}

export default Hero
