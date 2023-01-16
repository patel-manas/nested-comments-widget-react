import { State, User } from "../Types";

export const initialState: State = {
    loader: false,
    comments: [
        { id: 1673892942109, text: "errsvs wegvwevwevew", parentId: 1673892869157, replies: [1673892946955], author: "John Doe" },
        { id: 1673892946955, text: "sdvsrvewvewvewvg", parentId: 1673892942109, replies: [1673892952400], author: "John Doe" },
        { id: 1673892952400, text: "dsvsvevbewvwevewv", parentId: 1673892946955, replies: [], author: "John Doe" },
        { id: 1673896007546, text: "the movies avatar 2 is nice and a must watch", parentId: null, replies: [1673896027512, 1673896040540, 1673896163554, 1673896218928], author: "John Doe" },
        { id: 1673896163554, text: "Do you think it's worth spending time", parentId: 1673896007546, replies: [1673896182875], author: "Simon Carter" },
        { id: 1673896182875, text: "yes", parentId: 1673896163554, replies: [1673896200406], author: "James Neil" },
        { id: 1673896218928, text: "Grt! this weekend is sorted", parentId: 1673896007546, replies: [], author: "David Cole" },
        { id: 1673896237694, text: "I agree, the VFX used are awosome", parentId: null, replies: [], author: "David Cole" }
    ]
}

export const initialUsers: User[] = [
    {
        name: "John Doe",
        id: 1
    },
    {
        name: "David Cole",
        id: 2
    },
    {
        name: "Simon Carter",
        id: 3
    },
    {
        name: "James Neil",
        id: 4
    },
]

