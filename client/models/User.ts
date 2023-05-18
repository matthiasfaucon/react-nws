export default interface User {
    id: number;
    name: string;
    password: string;
    images: string[];
    createdAt: Date;
}