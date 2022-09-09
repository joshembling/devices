// import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import MainLayout from '@/components/Layouts/MainLayout'

const App = ({ Component, pageProps }) => (
    <MainLayout>
        <Component {...pageProps} />
    </MainLayout>
)

export default App
