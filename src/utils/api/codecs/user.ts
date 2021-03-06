/* eslint-disable @typescript-eslint/camelcase */
import * as t from 'io-ts'
import { mapOutput } from 'io-ts-types/lib/mapOutput'
import { withFallback } from 'io-ts-types/lib/withFallback'

const UserCodec = t.type({
    id: t.number,
    name: withFallback(t.string, ''),
    bio: withFallback(t.string, ''),
    avatar_url: t.string,
    public_repos: t.number
})

type UserResource = t.TypeOf<typeof UserCodec>

function userMapper({ id, name, bio, avatar_url, public_repos }: UserResource) {
    return {
        id,
        name,
        description: bio,
        avatar: avatar_url,
        publicRepos: public_repos
    }
}

export default {
    decoder: UserCodec,
    map: mapOutput(UserCodec, userMapper).encode
}
