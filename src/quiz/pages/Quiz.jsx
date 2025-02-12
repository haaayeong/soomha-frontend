import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SubNav from '../../components/SubNav';
import QuizContent from '../components/QuizContent';
import '../styles/Quiz.css'

function Quiz() {
  return (
    <main className="quiz">
      <Header />
      <div className="ctrl-box">
        <SubNav />
        <QuizContent />
      </div>
      <Footer />
    </main>
  )
}

export default Quiz;