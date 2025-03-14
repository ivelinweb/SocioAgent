import { createPublicClient, http } from 'viem'
import { blazeTestnet } from '../const/blazeChain'

export function createViemPublicClient() {
    return createPublicClient({
        chain: blazeTestnet,
        transport: http(),
    });
}
