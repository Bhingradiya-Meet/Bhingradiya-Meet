# Superbase Schema for Portfolio Website & Single Person Resume Generator

## Site Settings


| Column      | Type      | Default             | Constraints |
| ----------- | --------- | ------------------- | ----------- |
| `SettingID` | `uuid`    | `gen_random_uuid()` | Primary     |
| `Key`       | `varchar` | NULL                | Unique      |
| `Value`     | `varchar` | NULL                |

```JSON
{
    "Hero": true,
    "About": true,
    "Skills": {
        "enabled": true,
        "limit": 5,
        "shuffle": true,
        "category": true,
        "stars": true,
        "categorylimit": 5
    },
    "Experience": {
        "enabled": true,
        "limit": 5,
        "shuffle": true
    },
    "Projects": {
        "enabled": true,
        "limit": 5,
        "shuffle": true,
        "linksShow": true
    },
    "Blogs": {
        "enabled": true,
        "limit": 5,
        "shuffle": true,
        "SEO": true
    },
    "Social": {
        "enabled": true,
        "limit": 5,
        "shuffle": true
    },
    "Tickets": {
        "enabled": true,
        "messageLimitbeforeReply": 3,
        "userMaxCreatelimit": 1
    },
    "Contact": {
        "enabled": true,
        "location": false,
        "mobile": false,
        "email": true,
        "data": {
            "address": "",
            "phone": "",
            "email": ""
        }
    },
    "ResumeDownload": false
}
```

## Certifications

The Certifications table stores certifications, including a unique ID, user ID, certification name, certification authority, certification URL, and timestamps for creation and updates. It is designed for user profile management and display on landing pages.

| Column            | Type      | Default                 | Constraints |
| ----------------- | --------- | ----------------------- | ----------- |
| `CertificationID` | `uuid`    | `gen_random_uuid()`     | Primary     |
| `Name`            | `varchar` | `''::character varying` |
| `Authority`       | `varchar` | `''::character varying` |
| `URL`             | `varchar` | `''::character varying` |
| `Thumbnail`       | `varchar` | `''::character varying` |
| `isShown`         | `boolean` | `false`                 |

## EmailBlacklist

The EmailBlacklist table stores blacklisted email addresses, including a unique ID, email address, and reason for blacklisting. It is designed for email verification and user management.

| Column          | Type      | Default                 | Constraints |
| --------------- | --------- | ----------------------- | ----------- |
| `EmailID`       | `uuid`    | `gen_random_uuid()`     | Primary     |
| `Username`      | `varchar` | `''::character varying` |
| `Email`         | `varchar` | `''::character varying` | Unique      |
| `Reason`        | `varchar` | `''::character varying` |
| `isBlacklisted` | `boolean` | `true`                  |

## Skills

The Skills table stores skills, including a unique ID, skill name, skill category, skill level, and user ID. It is designed for user profile management and display on landing pages.

| Column     | Type      | Default                 | Constraints |
| ---------- | --------- | ----------------------- | ----------- |
| `SkillID`  | `uuid`    | `gen_random_uuid()`     | Primary     |
| `Name`     | `varchar` | `''::character varying` |
| `Category` | `varchar` | `''::character varying` |
| `Stars`    | `int`     | `0`                     |
| `Icon`     | `varchar` | `''::character varying` |
| `isShown`  | `boolean` | `false`                 |

## Experiences

The Experiences table stores work experiences, including a unique ID, user ID, company name, job title, job description, start date, end date, and timestamps for creation and updates. It is designed for user profile management and display on landing pages.

| Column         | Type      | Default                 | Constraints                    |
| -------------- | --------- | ----------------------- | ------------------------------ |
| `ExperienceID` | `uuid`    | `gen_random_uuid()`     | Primary                        |
| `Company`      | `varchar` | `''::character varying` |
| `Title`        | `varchar` | `''::character varying` |
| `Description`  | `varchar` | `''::character varying` |
| `StartDate`    | `date`    | `now()`                 |
| `EndDate`      | `date`    | `now()`                 |
| `isCurrent`    | `boolean` | `false`                 |
| `Skills`       | `uuid[]`  | NULL                    | REFERENCES Skills(SkillID)     |
| `Projects`     | `uuid[]`  | NULL                    | REFERENCES Projects(ProjectID) |
| `isShown`      | `boolean` | `false`                 |

## Projects

The Projects table stores projects, including a unique ID, project name, project description, project category, project URL, project image, project tags, and timestamps for creation and updates. It is designed for user profile management and display on landing pages.

| Column        | Type      | Default                 | Constraints |
| ------------- | --------- | ----------------------- | ----------- |
| `ProjectID`   | `uuid`    | `gen_random_uuid()`     | Primary     |
| `Name`        | `varchar` | `''::character varying` |
| `Description` | `varchar` | `''::character varying` |
| `Category`    | `varchar` | `''::character varying` |
| `URL`         | `varchar` | `''::character varying` |
| `Thumbnail`   | `varchar` | `''::character varying` |
| `Images`      | `Json`    | NULL                    |
| `Tags`        | `Json`    | NULL                    |
| `isShown`     | `boolean` | `false`                 |

## Social Link

The SocialLinks table stores social media links, including a unique ID, user ID, social media platform, and URL. It is designed for user profile management and display on landing pages.

| Column        | Type      | Default                 | Constraints |
| ------------- | --------- | ----------------------- | ----------- |
| `SocialID`    | `uuid`    | `gen_random_uuid()`     | Primary     |
| `SocialMedia` | `varchar` | `''::character varying` |
| `ProfilePic`  | `varchar` | `''::character varying` |
| `URL`         | `varchar` | `''::character varying` |
| `Username`    | `varchar` | `''::character varying` |
| `isShown`     | `boolean` | `false`                 |

## Tickets

The Tickets table stores support tickets, including a unique ID, user ID, ticket status, ticket type, ticket priority, ticket subject, ticket content, timestamps for creation and updates, and assigned staff. It is designed for support ticket management.

| Column        | Type          | Default                            | Constraints                      |
| ------------- | ------------- | ---------------------------------- | -------------------------------- |
| `TicketID`    | `uuid`        | `gen_random_uuid()`                | Primary                          |
| `isOpen`      | `boolean`     | `true`                             |
| `Email`       | `varchar`     | `''::character varying`            | REFERENCES EmailBlacklist(Email) |
| `Title`       | `varchar`     | `''::character varying`            |
| `Description` | `varchar`     | `''::character varying`            |
| `Update`      | `timestamptz` | `(now() AT TIME ZONE 'utc'::text)` |
| `Create`      | `timestamptz` | `(now() AT TIME ZONE 'utc'::text)` |

## Messages

The Messages table stores messages between users, including a unique ID, sender ID, recipient ID, message content, timestamps for creation and updates, and read status. It is designed for chat applications.

| Column            | Type          | Default                            | Constraints                      |
| ----------------- | ------------- | ---------------------------------- | -------------------------------- |
| `MessageID`       | `uuid`        | `gen_random_uuid()`                | Primary                          |
| `TicketID`        | `uuid`        | NULL                               | References Tickets(TicketID)     |
| `Content`         | `varchar`     | `''::character varying`            |
| `IsSystemMessage` | `boolean`     | `false`                            |
| `FileURL`         | `varchar`     | NULL                               |
| `FileType`        | `varchar`     | NULL                               |
| `SentAt`          | `timestamptz` | `(now() AT TIME ZONE 'utc'::text)` |
| `UpdatedAt`       | `timestamptz` | `(now() AT TIME ZONE 'utc'::text)` |
| `ReadAt`          | `timestamptz` | NULL                               |
| `Email`           | `varchar`     | NULL                               | REFERENCES EmailBlacklist(Email) |

## Blogs

The Blogs table stores blog posts, including a unique ID, title, author, markdown content, tags, a banner image, short description for previews, timestamps for creation and updates, publication status, and view count. It is designed for blog management and display on landing pages.

| Column        | Type          | Default                            | Constraints                         |
| ------------- | ------------- | ---------------------------------- | ----------------------------------- |
| `BlogID`      | `uuid`        | `gen_random_uuid()`                | Primary                             |
| `Author`      | `varchar`     | `''::character varying`            | REFERENCES EmailBlacklist(Username) |
| `BannerImage` | `varchar`     | NULL                               |
| `Title`       | `varchar`     | `''::character varying`            |
| `Tags`        | `Json`        | NULL                               |
| `Description` | `varchar`     | NULL                               |
| `Content`     | `Text`        | NULL                               |
| `Security`    | `varchar`     | `'Private'::character varying`     |
| `PublishDate` | `timestamptz` | `(now() AT TIME ZONE 'utc'::text)` |
| `isPublished` | `boolean`     | `false`                            |
| `UpdateDate`  | `timestamptz` | `(now() AT TIME ZONE 'utc'::text)` |
| `CreateDate`  | `timestamptz` | `(now() AT TIME ZONE 'utc'::text)` |