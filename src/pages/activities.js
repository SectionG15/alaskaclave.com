import React from "react";
import SEO from "../components/seo";
import { GatsbyImage } from "gatsby-plugin-image";
import useContentfulActivities from "../hooks/useContentfulActivities";
import InfoPage from "../components/infoPage";
import * as activitiesStyles from "../css/activities.module.css";

const activityTags = {
    "Guided Tour": activitiesStyles.activityTagGuidedTour,
    "Museum": activitiesStyles.activityTagMuseum
};

function displayActivitySet(title, activities) {
    return <div key={title}>
        <h1 className={activitiesStyles.activitySetTitle}>{title}</h1>
        <div className={activitiesStyles.activitySet}>
            {activities.map((activity) => (
                <div className={activitiesStyles.activity} key={activity.id}>
                    {
                        activity.url ? <h2><a target={"__blank"} href={activity.url} rel={"external"}>{activity.name} <span>🔗</span></a></h2>
                            : <h2>{activity.name}</h2>
                    }
                    <div className={activitiesStyles.activityTags}>
                        {activity.tags?.map((tag) => <p className={activityTags[tag]} key={tag}>{tag}</p>)}
                    </div>
                    <div className={activitiesStyles.activityContent}>
                        <p>{activity.description?.description}</p>
                        <GatsbyImage className={activitiesStyles.activityImage} image={activity.image?.gatsbyImageData} alt={activity.name} placeholder={"blurred"} />
                    </div>
                </div>
            ))}
        </div>
    </div>
}

export default function Activities() {
    const activities = useContentfulActivities();
    const inCampActivities = [];
    const fairbanksActivities = [];

    for (const { node } of activities) {
        if (node.inCamp) {
            inCampActivities.push(node);
        } else {
            fairbanksActivities.push(node);
        }
    }

    return (
        <InfoPage title={"Activities"} description={"Customize your experience"}>
            {displayActivitySet("In-Camp Festivities", inCampActivities)}
            {displayActivitySet("Fairbanks Excursions", fairbanksActivities)}
        </InfoPage>
    );
}

export const Head = () => (
    <SEO title={"Activities"} />
);