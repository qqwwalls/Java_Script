declare class RestClient {
    private static readonly _URL;
    static getData(): Promise<any>;
    static addData(post: object): Promise<any>;
    static deleteData(id: string | number): Promise<any>;
    static updateData(id: string | number, post: object): Promise<any>;
}
export default RestClient;
//# sourceMappingURL=RestClient.d.ts.map