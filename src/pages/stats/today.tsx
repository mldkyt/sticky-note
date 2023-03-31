import { useEffect, useRef, useState } from "react";

export default function StatsToday() {
    const hasRan = useRef(false);

    const [commits, setCommits] = useState<Array<any>>([]);
    const [programmerIndex, setProgrammerIndex] = useState<any>({});

    function doShit() {
        fetch("https://tda.knapa.cz/user/", {
            headers: {
                "x-access-token": "4edf7cc1b1b1adc7570ad97f9c3219fa"
            }
        }).then(x => x.json()).then(x => {
            // make it so the value userID is the key
            const index: any = {};
            x.forEach((x: any) => {
                index[x.userID] = x;
            });
            setProgrammerIndex(index);
        });

        fetch("https://tda.knapa.cz/commit/", {
            headers: {
                "x-access-token": "4edf7cc1b1b1adc7570ad97f9c3219fa"
            }
        }).then(x => x.json()).then(x => {
            // today's records only
            const today = x.filter((x: any) => new Date(x.date).getDate() == new Date().getDate());
            setCommits(today);
        });
    }

    useEffect(() => {
        if (!hasRan.current) {
            hasRan.current = true; 
            // get all users
            doShit();
            setInterval(doShit, 60000);
        }
    });

    return (
        <div>
            <h1>Stats today</h1>
            <p>There are {commits.length} commits today.</p>
            {/* table */}
            <table>
                <thead>
                    <tr>
                        <th>user</th>
                        <th>Lines added</th>
                        <th>Lines removed</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {/* go through programmers, find best one by added_lines of code use creator_id to identify programmer */}
                    {/* daily */}
                    {commits.map((x: any) => {
                        return (
                            <tr>
                                <td>{programmerIndex[x.creator_id].name}</td>
                                <td>{x.lines_added}</td>
                                <td>{x.lines_removed}</td>
                                <td>{x.description}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}