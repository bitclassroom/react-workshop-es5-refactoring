const n1 = [
    {
        fullName: 'First Last',
        avatarUrl: 'thumbnail',
        dob: '22/11/2020',
    },
]

const users = [
    {
        name: {
            title: 'mr',
            first: 'oliver',
            last: 'lewis',
        },
        email: 'oliver.lewis@example.com',
        dob: '1980-04-22 10:44:04',
        picture: {
            large: 'https://randomuser.me/api/portraits/men/45.jpg',
            medium: 'https://randomuser.me/api/portraits/med/men/45.jpg',
        },
    },
    {
        name: {
            title: 'mr',
            first: 'jim',
            last: 'little',
        },
        email: 'jim.little@example.com',
        dob: '1950-05-20 05:09:49',
        picture: {
            large: 'https://randomuser.me/api/portraits/men/84.jpg',
            medium: 'https://randomuser.me/api/portraits/med/men/84.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/men/84.jpg',
        },
    },
    {
        name: {
            title: 'mrs',
            first: 'liva',
            last: 'mortensen',
        },
        email: 'liva.mortensen@example.com',
        dob: '1948-05-06 12:49:39',
        picture: {
            large: 'https://randomuser.me/api/portraits/women/13.jpg',
            medium: 'https://randomuser.me/api/portraits/med/women/13.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/women/13.jpg',
        },
    },
]

const mappedUsers = users
    .map((user) => {
        const [date] = user.dob.split(' ')
        const [yearOfBirth] = date.split('-')

        return {
            fullName: `${user.name.first} ${user.name.last}`,
            avatarUrl: user.picture.thumbnail,
            yearOfBirth,
        }
    })
    .filter((user) => {
        console.log('user', user)
        return user.avatarUrl
    })
// .every((user) => {
//     const age = new Date().getFullYear() - Number.parseInt(user.yearOfBirth)
//     console.log('age', age)
//     return age > 50
// })

console.log('mappedUsers', mappedUsers)
