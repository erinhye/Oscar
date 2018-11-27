http://oscar.hyesuh.com/

![oscar2](https://user-images.githubusercontent.com/10420159/34464100-77264634-eeb5-11e7-8ec2-892ce0736579.png)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Oscar](#oscar)
  - [GUI](#introducing-gui)
  - [CUI (chat user interface)](#introducing-cui-chat-user-interface)
- [Examples of how to use the chat interface](#examples-of-how-to-use-the-chat-interface)
  - [Greetings](#greetings)
  - [Help](#help)
  - [Personal Questions](#personal-questions)
    - [Introducing Himself](#introducing-himself)
    - [Asking - Age](#asking---age)
    - [Asking - Where he is](#asking---where-he-is)
  - [Basic functions](#basic-functions)
  - [1. Basic - Add a task](#1-basic---add-a-task)
    - [by Title (DEFAULT)](#by-title-default)
    - [by Title and Person](#by-title-and-person)
    - [by Title and Groupname](#by-title-and-groupname)
    - [by Title and Deadline date](#by-title-and-deadline-date)
    - [by Title and #SUPERIMPORTANT](#by-title-and-superimportant)
    - [by Title, deadline and groupname](#by-title-deadline-and-groupname)
    - [by Title, deadline and #SUPERIMPORTANT](#by-title-deadline-and-superimportant)
    - [by Title, groupname and #SUPERIMPORTANT](#by-title-groupname-and-superimportant)
    - [by Title, deadline, groupname and #SUPERIMPORTANT](#by-title-deadline-groupname-and-superimportant)
  - [2. Basic - Delete a task](#2-basic---delete-a-task)
    - [by Title and groupname (DEFAULT)](#by-title-and-groupname-default)
  - [3. Basic - Add a Group](#3-basic---add-a-group)
    - [by Groupname (DEFAULT)](#by-groupname-default)
  - [4. Basic - Delete a Group](#4-basic---delete-a-group)
    - [by Groupname (DEFAULR)](#by-groupname-defaulr)
  - [Advanced functions](#advanced-functions)
  - [1. Searching - Searching tasks](#1-searching---searching-tasks)
    - [by Deadline Date](#by-deadline-date)
    - [by Person](#by-person)
    - [by Groupname and Deadline date](#by-groupname-and-deadline-date)
    - [by Priority (#SUPERIMPORTANT)](#by-priority-superimportant)
    - [by #SUPERIMPORTANT and deadline date](#by-superimportant-and-deadline-date)
    - [by #SUPERIMPORTANT and groupname](#by-superimportant-and-groupname)
    - [by #SUPERIMPORTANT, groupname and deadline date](#by-superimportant-groupname-and-deadline-date)
  - [2. Recommendation - Finding tasks](#2-recommendation---finding-tasks)
- [Small Talk](#small-talk)
- [Github links](#github-links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Oscar
Oscar is a chat assistant that helps you manage your prioritized tasks more effectively. the principal concept of the project is ‘combining a chat interface with a normal to-do platform’. so basically you can use functions such as adding or deleting tasks by using the GUI like normal to-do platforms, but it includes a chat interface in the project, which offers to help you to use more advanced functions in a user-friendly way.

## GUI
Graphical user interface is provided. like normal to-do platforms, it's possible to add tasks or groups to the website through it

## CUI (chat user interface)
press "Talk to me" button to start experiencing the chat interface. below are the basic guidelines to use the chat interface.

# Examples of how to use the chat interface
Here're great examples of how to start talking with him. Enjoy! ;-)

## Greetings

```md
Hi!
Howdy!
Greetings!
Good evening!
How are you?
How are you doing?
How ya doin?
What's up
sup
```

## Help

<img src="https://user-images.githubusercontent.com/10420159/33828558-f957145a-deaf-11e7-8d11-c181d470c0ca.gif" width="500"/>

```md
What can you help me with?
What can you do?
Could you show me the examples?
```
or you can just say "Help" or "Examples" to show the examples!

## Personal Questions

### Introducing Himself

```md
So, Who's this
Who are you?
Here he is
What is your name
```

### Asking - Age

```md
Can I ask you how old you are?
How old are you?
Ohh, I was wondering if I could ask you how old you are
If you don't mind me asking how old are you
```

### Asking - Where he is

```md
Where do you live
Where are you?
I can't find where you are
```


## Basic functions

## 1. Basic - Add a task

<img src="https://user-images.githubusercontent.com/10420159/33806064-a2e6cae8-de05-11e7-8e8d-6e45dca133a0.gif" width="500"/>

### by Title (DEFAULT)

```md
I'd like to add a task ride a bike
```

*you MUST include the word "task" before your taskname in your sentence*


### by Title and Person

```md
I'd like to add a task ride a bike with angelica
```
*only english names are available*

### by Title and Groupname

```md
I'd like to add a task ride a bike in a Group called [EXISTING-GROUPNAME]
```
*only groups that have already been created can be recognized through the chat interface (except for adding groups)*

*you MUST include the word "group called" before your groupname in your sentence*

*he distinguishes between uppercase and lowercase letters of groupnames*

*do not use spaces in groupnames*

### by Title and Deadline date

```md
I'd like to add a task ride a bike, this Friday
I'd like to add a task ride a bike, next Thursday
I'd like to add a task ride a bike, Tomorrow
```

*for your reference*
```md
this Monday
this Sunday
next Monday
next Sunday
Tomorrow
Today
```


### by Title and #SUPERIMPORTANT

```md
I'd like to add a SUPER IMPORTANT task ride a bike
I'd like to add an important task ride a bike
I'd like to add a superimportant task wowowo
```


### by Title, deadline and groupname

```md
I'd like to add a task ride a bike in a group called [EXISTING-GROUPNAME], this Friday
```


### by Title, deadline and #SUPERIMPORTANT

```md
I'd like to add a superimportant task hanging out, tomorrow
id like to add a super important task ride a bike, next thursday
id like to add an important task ride a bike, this sunday
```

### by Title, groupname and #SUPERIMPORTANT

```md
I'd like to add a super important task ride a bike in a group called [EXISTING-GROUPNAME]
```

### by Title, deadline, groupname and #SUPERIMPORTANT

```md
I'd like to add an important task Hang out in a group called [EXISTING-GROUPNAME], this tuesday
```

## 2. Basic - Delete a task

<img src="https://user-images.githubusercontent.com/10420159/33806067-a578b7b2-de05-11e7-9565-91fffa17c9b4.gif" width="500"/>

### by Title and groupname (DEFAULT)

```md
I'd like to delete a task Hang out in a group called [EXISTING-GROUPNAME]
```



## 3. Basic - Add a Group

<img src="https://user-images.githubusercontent.com/10420159/33806068-a8a9ba30-de05-11e7-8fb4-1cf2c8d03297.gif" width="500"/>

### by Groupname (DEFAULT)

```md
I'd like to add a group called [GROUPNAME]
```

*you MUST include the word "group called" before your groupname in the sentence*

*he distinguishes between uppercase and lowercase letters of groupnames*

*do not use spaces in groupnames*


## 4. Basic - Delete a Group

<img src="https://user-images.githubusercontent.com/10420159/33821760-728b345e-de98-11e7-9913-9292345f49b1.gif" width="500"/>

### by Groupname (DEFAULR)

```md
I'd like to delete a group called [EXISTING-GROUPNAME]
```

*only groups that have already been created can be recognized through the chat interface (except for adding groups)*

__Unsorted CANNOT BE DELETED__

*you should delete all tasks in a group you're going to delete before you delete a group*

## Advanced functions

## 1. Searching - Searching tasks

<img src="https://user-images.githubusercontent.com/10420159/33826026-f2d96e38-dea6-11e7-8289-122613f36286.gif" width="500"/>

### by Deadline Date

```md
I'm looking for tasks tomorrow
I'm looking for tasks next Wednesday
I'm looking for tasks I gotta do today
I'm looking for tasks I gotta do next Friday
I'm looking for tasks I need to do next Monday
the tasks I have to do next Tuesday
im looking for tasks this monday
im looking for tasks for today
```

*for your reference*
```md
this Monday
this Sunday
next Monday
next Sunday
Tomorrow
Today
```

### by Person

```md
I'm looking for tasks associated with Angelica
```
*only english names are available*

### by Groupname and Deadline date

```md
I'm looking for tasks in a group called [EXISTING-GROUPNAME], next wednesday
```

*you MUST include the word "group called" before your groupname in the sentence*

*he distinguishes between uppercase and lowercase letters of groupnames*

*do not use spaces in groupnames*

### by Priority (#SUPERIMPORTANT)

//#### by Priority and Groupname
```md
I'm looking for important tasks
```

### by #SUPERIMPORTANT and deadline date

```md
I'm looking for super important tasks today
I'm looking for SUPERIMPORTANT tasks next monday
```

### by #SUPERIMPORTANT and groupname

```md
I'm looking for superimportant tasks in a group called [EXISTING-GROUPNAME]
```

*only groups that have already been created can be recognized through the chat interface (except for adding groups)*

### by #SUPERIMPORTANT, groupname and deadline date

```md
I'm looking for important tasks in a group called [EXISTING-GROUPNAME], next wednesday
```

## 2. Recommendation - Finding tasks

<img src="https://user-images.githubusercontent.com/10420159/33806071-ac08a5c4-de05-11e7-9fca-27107607838c.gif" width="500"/>

```md
What do you think I should do first?
What do you think I should do
```

*the result depends on tasks that you've just added*

# Small Talk

```md
Answer my question.
Can you get smarter?
Aww, you're cute
What's your birth date?
Who's your boss
Are you busy?
```
and so on...


# Github links

links are available for a limited-time

https://github.com/erinhye/Oscar

https://github.com/erinhye/Oscar-node-webhook
