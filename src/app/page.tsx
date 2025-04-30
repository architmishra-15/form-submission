import Header from '../components/Header'
import Footer from '../components/Footer'
import HomePage from '../components/HomePage'

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HomePage />
      </main>
      <Footer />
    </div>
  )
}