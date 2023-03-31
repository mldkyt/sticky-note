/*{
    "creator_id": "a0a818a9-2a18-49b3-896c-48902ca51fd5",
    "date": "2023-03-31T13:21:46.628380",
    "lines_added": 0,
    "lines_removed": 0,
    "description": "string",
    "commit_id": "9af6d400-0754-4db9-b1ad-ffc166ab841d"
  }*/

export interface Commit {
    creator_id: string;
    date: string;
    lines_added: number;
    lines_removed: number;
    description: string;
    commit_id: string;
}