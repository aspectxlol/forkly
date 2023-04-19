import Image from 'next/image'
import { Inter } from 'next/font/google'
import PhoneInput from '@forkly/components/PhoneInput'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <PhoneInput />
    </>
  )
}
