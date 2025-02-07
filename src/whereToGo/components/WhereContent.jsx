// WhereContent.js
import { useState } from "react";
import SelectFilter from "./SelectFilter";
import WhereCard from "./WhereCard";


function WhereContent() {
  const [isNextWeek, setIsNextWeek] = useState(false);

  return (
    <section className="where-content">
      <article className="where-tab">
        <button
          className={isNextWeek ? "" : "active"}
          onClick={() => setIsNextWeek(false)}
        >
          전체보기
        </button>
        <button
          className={isNextWeek ? "active" : ""}
          onClick={() => setIsNextWeek(true)}
        >
          다음주는 어때?
        </button>
      </article>

      <SelectFilter isNextWeek={isNextWeek} />

      <article className="where-cards">
        {[...Array(8)].map((_, index) => (
          <WhereCard key={index} isNextWeek={isNextWeek} />
        ))}
      </article>
    </section>
  );
}

export default WhereContent;
