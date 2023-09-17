import Link from 'next/link';
interface HeaderProps {
  children?: React.ReactNode,
  locale: string
}
export default function Header({ locale }: HeaderProps) {
  return (
    <header>
      <nav>
        <ul>
          <li><Link href={`/${locale}`}></Link>Home</li>
          <li><Link href={`/${locale}/about`}></Link>About</li>
        </ul>
      </nav>
    </header>
  )
}