import Header from "../../components/Header";
import SubNav from "../../components/SubNav";
import SelectFilter from "../components/SelectFilter";
import WhereCard from "../components/WhereCard";

import '../styles/WhereToGo.css'
import '../styles/WhereMedia.css'

function WhereToGo() {
  return (
    <main className="where-to-go">
      <Header />
      <div className="ctrl-box">
        <SubNav />
        <section className="where-content">
          <article className="where-tab">
            <button className="active">전체보기</button>
            <button>다음주는 어때?</button>
          </article>

          <SelectFilter />

          <article className="where-cards">
            <WhereCard/>
          </article>

        </section>
      </div>
    </main>
  )
}

export default WhereToGo;