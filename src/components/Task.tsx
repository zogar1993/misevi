import React from 'react';

// @ts-ignore
export default function Task({ task, onArchiveTask, onPinTask }: Props) {
    const { id, title, state } = task
    return (
        <div className="list-item">
            <input type="text" value={title} readOnly={true} />
        </div>
    );
}

type Props = {
    task: TaskInfo
    onArchiveTask: any
    onPinTask: any
}

type TaskInfo = {
    id: string
    title: string
    state: any
}