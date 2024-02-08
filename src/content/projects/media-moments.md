---
title: Media Moments
titleShort: Media Moments
description: As a contributor to the 'Meetup der Medieninformatik,' I conceptualized and brought to life the Media Moments web app. This application empowers pedestrians to connect with the projects crafted by first-semester media informatics students. Navigating the city of Lübeck, users can explore an interactive map pinpointing various project locations. The app seamlessly integrates with the physical world, allowing users to unlock exclusive content by simply scanning the QR code at each project site.
image: ./media-moments.png
imageAlt: Smartphones displaying the map and station screens of the media moments app.
lastUpdate: 2024-02-07T15:42:00
sortOrder: 0
featured: true
---

**Note**: This article is work in progress.

The ['Meetup der Medieninformatik'](https://www.uni-luebeck.de/aktuelles/pressemitteilung/artikel/media-moments-2023-digitale-studierenden-projekte-mitten-in-luebeck.html)
serves as an annual technical showcase hosted by the Media Informatics major at
the Universität zu Lübeck. Here, technical prowess and creativity merge,
unveiling 'EMI-Projects' from first-semester students and 'bachelor projects'
from fifth-semester students. The event culminates in the 'EMI-Award,'
recognizing excellence in first-semester projects.

The Media Moments web app, born from a 'bachelor project' during my
undergraduate studies, is designed to showcase the EMI-Projects to the public.
In 2024 the Media Moments will be publicly available on 14.02.2024 at
[app.emi-award.de](https://app.emi-award.de).

### Technical Components: Under the Hood

The technical backbone of Media Moments is powered by Vue.js 3 as its frontend
framework. The interactive map, fueled by maplibre-gl-js, and Swiper,
orchestrating slides in onboarding and station detail sites, form integral
components. The backend transitioned between [Strapi](https://strapi.io/) and
[Directus](https://directus.io/) to adapt to evolving event requirements.
Prioritizing practicality, the app ensures accessibility without mandatory
registrations, utilizing an anonymous user with a randomized ID for features
requiring central user management, all in accordance with privacy policies.

The app has iteratively optimized bundle sizes, adjusted dependencies, and
implemented features like asynchronous loading and intelligent chunking. These
changes cater to practical needs, ensuring smooth user experiences, especially
in areas with limited mobile data.

Since its inception in 2018, the Media Moments web app has been a technical
ally at the 'Meetup der Medieninformatik.' It facilitates engagement with
projects, contributing to the technical vibrancy of the event and the media
informatics community at the Universität zu Lübeck. With an annual audience of
approximately 300-400 digital visitors, the app has seamlessly integrated into
the event's digital infrastructure, providing a user-friendly experience and
fostering interaction with the showcased projects.
