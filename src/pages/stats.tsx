import NavBar from "@/components/elements/NavBar";
import { CommitsBorder, CommitsAmount, CommitsAmountText, backgroundColor, DailyCommitsBorder, DailyCommitsAmountText, DailyCommitsAmount, LastCommitBorder, LastCommitText, LastCommit, LastCommitLines, UptimeBorder, Uptime, UptimeText, BestProgrammer, BestProgrammerBorder, BestProgrammerText, DateStyle, BestProgrammerUp, BestProgrammerDown } from "@/components/styles/stats";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ['latin'] });

export default function Stats() {

    const [totalWrites, setTotalWrites] = useState<number>(0);
    const [dailyWrites, setDailyWrites] = useState<number>(0);
    const [lastWrite, setLastWrite] = useState<Array<string>>([]);
    const [linesAdded, setLinesAdded] = useState<number>(0);
    const [linesRemoved, setLinesRemoved] = useState<number>(0);
    const [bestProgrammer, setBestProgrammer] = useState<string>("");
    const [bestProgrammerLinesAdded, setBestProgrammerLinesAdded] = useState<number>(0);
    const [bestProgrammerLinesRemoved, setBestProgrammerLinesRemoved] = useState<number>(0);
    const [uptime, setUptime] = useState<string>("");

    function doShit() {
        fetch("https://tda.knapa.cz/commit/", {
            headers: {
                "x-access-token": "4edf7cc1b1b1adc7570ad97f9c3219fa"
            }
        }).then(x => x.json()).then(x => {
            setTotalWrites(x.length);
            // there is a date property, use it to get today's commits
            setDailyWrites(x.filter((x: any) => new Date(x.date).getDate() == new Date().getDate()).length);
            // go through programmers, find best one by added_lines of code use creator_id to identify programmer
            // filter it against the date 
            const programmerMap: any = {}
            x.filter((x: any) => new Date(x.date).getDate() == new Date().getDate())
            .forEach((x: any) => {
                if (programmerMap[x.creator_id]) {
                    programmerMap[x.creator_id] += x.lines_added;
                } else {
                    programmerMap[x.creator_id] = x.lines_added;
                }
            });
            let bestProgrammerId = 0;
            let bestProgrammerLines = 0;
            Object.keys(programmerMap).forEach((x: any) => {
                if (programmerMap[x] > bestProgrammerLines) {
                    bestProgrammerId = x;
                    bestProgrammerLines = programmerMap[x];
                }
            });
            fetch("https://tda.knapa.cz/user/" + bestProgrammerId, {
                headers: {
                    "x-access-token": "4edf7cc1b1b1adc7570ad97f9c3219fa"
                }
            }).then(x => x.json()).then(x => {
                setBestProgrammer(x.name);
                setBestProgrammerLinesAdded(bestProgrammerLines);
            });
        });

        fetch("https://tda.knapa.cz/commit/latest/1", {
            headers: {
                "x-access-token": "4edf7cc1b1b1adc7570ad97f9c3219fa"
            }
        }).then(x => x.json()).then(x => {
            setLastWrite([
                "Date: " + new Date(x[0].date).toLocaleString(),
                "Description: " + x[0].description 
            ]);
            setLinesAdded(x[0]["lines_added"]);
            setLinesRemoved(x[0]["lines_removed"]);
        });

        fetch("https://tda.knapa.cz/sysinfo/", {
            headers: {
                "x-access-token": "4edf7cc1b1b1adc7570ad97f9c3219fa"
            }
        }).then(x => x.json()).then(x => {
            // there is boot_time, calculate uptime
            const uptime = new Date().getTime() - new Date(x.boot_time).getTime();
            const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            setUptime(days + "d " + hours + "h");
        });
    }

    const hasLoaded = useRef(false);
    useEffect(() => {
        if (!hasLoaded.current) {
            hasLoaded.current = true;
            doShit();
            setInterval(doShit, 60000);
        }
    });

    return (
        <div className={inter.className}>
            <Head>
                <title>Statistics</title>
                {/* <curl -X 'GET' \
        'https://tda.knapa.cz/commit/latest/1' \
        -H 'accept: application/json' \
        -H 'x-access-token: 4edf7cc1b1b1adc7570ad97f9c3219fa'> */}

            </Head>
            <NavBar onNew={() => { }} mode="stats" />
            <div style={backgroundColor}>
               
                <div style={CommitsBorder}>
                    <span style={CommitsAmountText}>Amount of commits</span>
                    <span style={CommitsAmount}>{totalWrites}</span>

                </div>
                <div style={DailyCommitsBorder}>
                    <span style={DailyCommitsAmountText}>Today’s amount</span>
                    <span style={DailyCommitsAmount}>{dailyWrites}</span>

                </div>
                <div style={UptimeBorder}>
                    <span style={UptimeText}>Uptime</span>
                    <span style={Uptime}>{uptime}</span>
                </div>
                
                <div style={LastCommitBorder}>
                    <span style={LastCommit}>Last commitment</span>
                    {
                        lastWrite.map((x, i) => <span key={i} style={{...LastCommitText, top: `${25 + i * 25}px`}}>{x}</span>)
                    }
                    <span style={LastCommitLines}>
                        <span style={{color: 'green'}}>+{linesAdded} </span>
                        <span style={{color: 'red'}}>-{linesRemoved}</span>
                    </span>
                </div>
                <div style={BestProgrammerBorder}>
                    <span style={BestProgrammerText}>Best Programmer</span>
                    <span style={BestProgrammer}>{bestProgrammer}</span>
                    <span style={{color: 'green', ...BestProgrammerUp}}>{bestProgrammerLinesAdded}</span>
                    <span style={{color: 'red', ...BestProgrammerDown}}>+{bestProgrammerLinesRemoved} </span>
                </div>
            </div>
        </div>
    )
}
