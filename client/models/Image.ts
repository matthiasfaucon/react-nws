import User from './User';

export default interface Image {
    id: number;
    name: string;
    size: number;
    url: string;
    isPublic: boolean;
    user: User;
    createdAt: Date;
}