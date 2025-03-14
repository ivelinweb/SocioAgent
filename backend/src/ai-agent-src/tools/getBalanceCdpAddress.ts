import { Address, createPublicClient, http } from 'viem';
import { ToolConfig } from './allTools';
import { formatEther } from 'viem';
import { blazeTestnet } from '../const/blazeChain';

interface GetBalanceArgs {
    wallet: string;
    uuid: string;
}

export const getBalanceCdpAddressTool: ToolConfig<GetBalanceArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'get_balance_cdp_address',
            description: "Get the balance of a wallet address on the Sonic Blaze Testnet",
            parameters: {
                type: 'object',
                properties: {
                    wallet: {
                        type: 'string',
                        description: 'The wallet address of the user which is retrieved from the get_wallet_address_from_twitter_id tool',
                    },
                    uuid: {
                        type: 'string',
                        description: 'The uuid of the user which is retrieved from the get_wallet_address_from_twitter_id tool',
                    }
                },
                required: ['wallet', 'uuid']
            }
        }
    },
    handler: async ({ wallet, uuid }) => {
        return await getBalance(wallet, uuid);
    }
};

async function getBalance(wallet: string, uuid: string) {
    try {
        const publicClient = createPublicClient({
            chain: blazeTestnet,
            transport: http(),
        });
        const balance = await publicClient.getBalance({ address: wallet as Address });
        return `Balance for wallet ${wallet}: ${formatEther(balance)} S`;
    } catch (error: any) {
        return `Error getting balance: ${error.message}`;
    }
}