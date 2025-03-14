import { defineChain } from "viem";

export const blazeTestnet = defineChain({
    id: 57054,
    name: 'Sonic Blaze Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Sonic',
        symbol: 'S',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.blaze.soniclabs.com'],
        },
    },
    blockExplorers: {
        default: { name: 'Sonic Explorer', url: 'https://testnet.sonicscan.org' },
    },
    testnet: true,
})