export class Category {
    constructor(
        public id: number,
        public name: string,
        public enabled: boolean,
        public allParentIDs: string,
        public parent: Category,
        public children: Category[],
    ) { }
}
