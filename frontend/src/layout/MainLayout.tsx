import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

import { Outlet } from 'react-router-dom'
import LeftSideBar from './components/LeftSideBar';
import AudioPlayer from './components/AudioPlayer';
import { PlaybackControls } from './components/PlaybackControls';
import FriendActivity from './components/FriendActivity';

const MainLayout = () => {
    const isMobile = false;

    return (
        <div className='h-screen bg-black text-white flex flex-col'>
            <ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden p-2'>
                <AudioPlayer />
                <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
                    <LeftSideBar />
                </ResizablePanel>
                <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />
                <ResizablePanel defaultSize={isMobile ? 80 : 60}>
                    <Outlet />
                </ResizablePanel>
                <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

                <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
                    <FriendActivity />
                </ResizablePanel>
            </ResizablePanelGroup>
            <PlaybackControls />


        </div>
    );
};

export default MainLayout;
