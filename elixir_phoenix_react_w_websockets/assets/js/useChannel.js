import { useState, useContext, useEffect } from 'react';
import { PhoenixSocketContext } from './PhoenixSocketContext';

const useChannel = channelName => {
    const [channel, setChannel] = useState();
    const { socket } = useContext(PhoenixSocketContext);

    useEffect(() => {
        const phoenixChannel = socket.channel(channelName);

        phoenixChannel.join().receive('ok', () => {
            setChannel(phoenixChannel);
        });

        channel.join().receive("ok", ({ messages }) => console.log('successfully joined channel', messages || '')).receive("error", ({ reason }) => console.error('failed to join channel', reason))

        return () => {
            phoenixChannel.leave();
        };
    }, []);

    return [channel];
};

export default useChannel;
