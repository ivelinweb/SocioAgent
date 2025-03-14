import { Address, parseEther, AccessList, createWalletClient, http, Chain, createPublicClient } from 'viem'
import { createViemWalletClient } from '../viem/createViemWalletClient.js';
import { ToolConfig } from './allTools.js';
import { blazeTestnet } from '../const/blazeChain';

interface SendTransactionArgs {
    to: Address;
    value?: string;
    sender: Address;
}

export const sendTransactionCustomChainTool: ToolConfig<SendTransactionArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'send_transaction_custom_chain',
            description: "Send a transaction on the Sonic Blaze Testnet",
            parameters: {
                type: 'object',
                properties: {
                    to: {
                        type: 'string',
                        description: 'The recipient address',
                    },
                    from: {
                        type: 'string',
                        description: 'The sender address',
                    },
                    value: {
                        type: 'string',
                        description: 'The amount of S tokens to send (in S, not Wei)',
                    },
                    chain: {
                        type: 'string',
                        description: 'The chain name (BlazeTestnet)',
                    }
                },
                required: ['to', 'value', 'chain'],
            }
        }
    },
    handler: async ({
        to,
        value,
        sender
    }) => {
        return await sendTransaction({
            to,
            value,
            sender,
        });
    }
};

async function sendTransaction({
    to,
    value,
    sender,
}: SendTransactionArgs) {
    try {
        const client = createWalletClient({
            chain: blazeTestnet,
            transport: http(),
        });

        const publicClient = createPublicClient({
            chain: blazeTestnet,
            transport: http(),
        });

        console.log(`Sending ${value} S to ${to}`);

        const tx = await client.sendTransaction({
            account: sender,
            to,
            value: BigInt(value!),
        });

        await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return `Transaction sent: https://testnet.sonicscan.org/${tx}`
    } catch (error: any) {
        return {
            success: false,
            hash: null,
            message: "Error: " + error.message
        };
    }
}
