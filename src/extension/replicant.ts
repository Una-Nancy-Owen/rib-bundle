export type DiscordMessage = {
  message: string;
  url: string;
}

export type HoraroItem = {
  length: string;
  length_t: string;
  scheduled: string;
  scheduled_t: string;
  data: {
    d0: string;
    d1: string;
    d2: string;
    d3: string;
    d4: string;
    d5: string;
  }
}

export type HoraroData = {
  meta: {
    exported: string;
    hint: string;
    api: string;
    api_link: string;
  }
  schedule: {
    name: string;
    slug: string;
    timezone: string;
    start: string;
    start_t: string;
    website: string;
    twitter: string;
    twitch: string;
    description: string;
    setup: string;
    setup_t: string;
    updated: string;
    url: string;
    event: {
      name: string;
      slug: string;
    }
    columns: {
      c0: string;
      c1: string;
      c2: string;
      c3: string;
      c4: string;
      c5: string;
    }
    items: Array<HoraroItem>
  }
}

// export type ReplicantMap = {
//   horaroData: HoraroData;
//   discordMessage: DiscordMessage;
// }

// export const replicantDefaultValues: ReplicantMap = {
//   discordMessage: {
//     message: '',
//     url: ''
//   },
//   horaroData: {
//     meta: {
//       exported: '',
//       hint: '',
//       api: '',
//       api_link: ''
//     },
//     schedule: {
//       name: '',
//       slug: '',
//       timezone: '',
//       start: '',
//       start_t: '',
//       website: '',
//       twitter: '',
//       twitch: '',
//       description: '',
//       setup: '',
//       setup_t: '',
//       updated: '',
//       url: '',
//       event: {
//         name: '',
//         slug: ''
//       },
//       columns: {
//         c0: '',
//         c1: '',
//         c2: '',
//         c3: '',
//         c4: '',
//         c5: ''
//       },
//       items: [
//         {
//           length: '',
//           length_t: '',
//           scheduled: '',
//           scheduled_t: '',
//           data: {
//             d0: '',
//             d1: '',
//             d2: '',
//             d3: '',
//             d4: '',
//             d5: ''
//           }
//         },
//         {
//           length: '',
//           length_t: '',
//           scheduled: '',
//           scheduled_t: '',
//           data: {
//             d0: '',
//             d1: '',
//             d2: '',
//             d3: '',
//             d4: '',
//             d5: ''
//           }
//         }
//       ]
//     }
//   }
// };
