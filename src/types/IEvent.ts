export interface IEvent {
    date: Date,
    topic: string,              // id of a project e.g. SunIce festival
    type: string,               // type of event ("member" | "report" | "task" | "server" )
    involved_users: string[],    // list of users
    source: string,             // source of the event e.g. service
    content: string,            // string of the notification
    action: undefined | string  // link within dashboard
}
