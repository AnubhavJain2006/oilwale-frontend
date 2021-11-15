export interface Activity {
    activityId ?: string,
    act: string,
    user: string,
    userId?: string,
    subject: string,
    subjectId:string,
    domain: string,
    createdAt?: Date,
    updatedAt?: Date,
    active?: boolean
}
