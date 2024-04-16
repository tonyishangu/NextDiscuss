import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { db } from "@/db";
import paths from "@/paths";

export default async function TopicList() {
    const topics = await db.topic.findMany()

    const renderedTopic = topics.map((topic) => {
        return (
            <div key={topic.id}>
                <Link href={paths.showTopic(topic.slug)}>
                    <Chip color="warning" variant="shadow">
                        {topic.slug}
                    </Chip>
                </Link>
            </div>
        )
    })
    return (
        <div className="flex flex-row gap-2 flex-wrap">
            {renderedTopic}
        </div>
    )
}