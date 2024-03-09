export class UserPaging {
    constructor() {
        this.skip = 1;
        this.take = 1;
    }
    skip = 0;

    take = 1;

    search?: number;
}
