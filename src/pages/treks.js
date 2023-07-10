import React, { useEffect, useState } from "react";
import SEO from "../components/seo";
import InfoPage from "../components/infoPage";
import useTreks from "../hooks/useTreks";
import * as trekStyles from "../css/treks.module.css";

function Trek({ name, price, activities }) {
  return (
    <div className={trekStyles.trek}>
      <h5 className={trekStyles.trekName}>{name}<span className={trekStyles.trekPrice}>${price}</span></h5>
      <div className={trekStyles.trekContent}>
        <p className={trekStyles.trekDescription}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam cum dolores earum facere, id illo minima nisi non porro quos tempora. A asperiores dignissimos labore molestiae quae rerum, tenetur.</p>
        <ul className={trekStyles.trekActivities}>
          {activities.map((activity) => (
            <li key={activity}>
              <a
                href={`/activities#${activity}`}
                target={"__blank"}>
                {activity}
                <span>🔗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Treks() {
  const [site, setSite] = useState("camp");
  const [treks, setTreks] = useState([]);
  const trekList = useTreks();

  useEffect(() => {
    setTreks(trekList.filter(({ node }) => site === "camp" ? node.inCamp : !node.inCamp));
  }, [site])

  return (
    <InfoPage title={"Treks"} description={"Carefully selected activities"}>
      <h3>Treks</h3>
      <div className={trekStyles.siteSelection}>
        <button
          className={ site === "camp" ? trekStyles.selected : "" }
          onClick={() => setSite("camp")}>
          In Camp
        </button>
        <button
          className={ site === "fairbanks" ? trekStyles.selected : "" }
          onClick={() => setSite("fairbanks")}>
          In Fairbanks
        </button>
      </div>
      <div className={trekStyles.treks}>
        {treks.map(({ node }) => (
          <Trek
            name={node.name}
            price={node.price}
            activities={node.activities}
            key={node.name}
          />
        ))}
      </div>
    </InfoPage>
  );
}

export const Head = () => (
  <SEO title={"Treks"} />
);