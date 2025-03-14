import { Address, createPublicClient, http } from 'viem';
import { createViemPublicClient } from '../viem/createViemPublicClient';
import { ToolConfig } from './allTools';
import { formatEther } from 'viem';
import { blazeTestnet } from '../const/blazeChain';

interface GetBalanceArgs {
    wallet: Address;
    chain: string;
}

export const getBalanceCustomTool: ToolConfig<GetBalanceArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'get_balance_custom',
            description: 'Get the balance of a wallet on the Sonic Blaze Testnet',
            parameters: {
                type: 'object',
                properties: {
                    wallet: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The wallet address to get the balance of',
                    },
                    chain: {
                        type: 'string',
                        description: 'The chain name (BlazeTestnet)',
                    }
                },
                required: ['wallet', 'chain']
            }
        }
    },
    handler: async ({ wallet, chain }) => {
        return await getBalance(wallet, chain);
    }
};

async function getBalance(wallet: Address, chain: string) {
    if (chain.toLowerCase() === 'blazetestnet') {
        const publicClient = createPublicClient({
            chain: blazeTestnet,
            transport: http(),
        });
        const balance = await publicClient.getBalance({ address: wallet });
        return formatEther(balance) + ' S';
    } else {
        return 'Please specify the chain as BlazeTestnet to get the balance';
    }
}