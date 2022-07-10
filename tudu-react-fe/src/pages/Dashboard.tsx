import { css } from '@emotion/css'
import React from 'react'
import { useSelector } from 'react-redux'
import { addTaskAPI } from '../api/addTask'
import { deleteTaskAPI } from '../api/deleteTask'
import { getListTaskAPI } from '../api/getListTask'
import { toggleTaskAPI } from '../api/toggleTask'
import BaseAvatar from '../components/BaseAvatar'
import BaseButton from '../components/BaseButton'
import BaseTextField from '../components/BaseTextField'
import DashboardHeader from '../components/DashboardHeader'
import { authSelector } from '../states/authSelectors'
import { DbAddTask, DbRemoveTask } from '../states/dbActionCreators'
import { dbTasksSelector } from '../states/dbSelectors'
import textStyles from '../styles/textStyles'
import TwoColumnsTemplate from '../templates/TwoColumnsTemplate'

const Dashboard = () => {
    const authState = useSelector(authSelector)
  return (
    <>
        <DashboardHeader/>
        <TwoColumnsTemplate
            leftChildren={
                <FeedSection/>
            }
            rightChildren={
                <>
                    <ProfileSection
                        username={authState.username}
                        fullName={authState.fullName}
                        occupation={authState.occupation}
                    />
                    <div style={{height: 16}} />
                    <DraftSection/>
                </>
            }
        />
    </>
  )
}

export default Dashboard

const FeedSection = () => {
    const tasks = useSelector(dbTasksSelector);

    const getTasks = () => {
        getListTaskAPI((res) => [
            ...(res.map(task => DbAddTask(task)))
        ])
    }

    React.useEffect(() => {
        getTasks()
    }, [])
    return (
        <div className={feedContainer}>
            <h4 className={textStyles.subtitle}>Feed</h4>
            <div style={{height: 20}} />
            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    id={task.id}
                    taskName={task.taskName}
                    taskDescription={task.taskDescription}
                    done={task.done}
                />
            ))}
            <BaseButton
                text='Older'
                onClick={getTasks}                
            />
        </div>
    )
}

const feedContainer = css`
    padding: 24px;
    background-color: whitesmoke;
    display: flex;
    flex-direction: column;
`;

interface ProfileSectionProps {
    username: string,
    fullName: string,
    occupation: string
}

const ProfileSection = (props: ProfileSectionProps) => {
    return (
        <div className={profileContainer}>
            <BaseAvatar
                username={props.username}
                fullName={props.fullName}
                size={60}
            />
            <div style={{width: 16}} />
            <div>
                <p className={textStyles.boldparagraph}>{props.username}</p>
                <p className={textStyles.lightparagraph}>{props.fullName} | {props.occupation}</p>
            </div>
        </div>
    )
}

const profileContainer = css`
    padding: 24px;
    background-color: whitesmoke;
    display: flex;
    align-items: center;
`;

const DraftSection = () => {
    const [taskName, setTaskName] = React.useState<string>("")
    const [taskDescription, setTaskDescription] = React.useState<string>("")

    const onTaskNameChange :React.ChangeEventHandler<HTMLInputElement> = (e) => setTaskName(e.target.value)
    const onTaskDescChange :React.ChangeEventHandler<HTMLInputElement> = (e) => setTaskDescription(e.target.value)

    const onClickAddTaskButton = () => {
        addTaskAPI({
            taskName: taskName,
            taskDescription: taskDescription
        }, (res) => [
            DbAddTask(res)
        ])
    }
    return (
        <div className={draftContainer}>
            <h4 className={textStyles.subtitle}>Add Task</h4>
            <div style={{height: 25}} />
            <BaseTextField
                type='text'
                value={taskName}
                placeholder='Task Name'
                onChange={onTaskNameChange}
            />
            <BaseTextField
                type='text'
                value={taskDescription}
                placeholder='Task Description'
                onChange={onTaskDescChange}
            />
            <BaseButton
                text='Submit'
                onClick={onClickAddTaskButton}
            />
        </div>
    )
}

const draftContainer = css`
    padding: 24px;
    background-color: whitesmoke;
    display: flex;
    flex-direction: column;
`;

interface TaskCardProps {
    id: string,
    taskName: string,
    taskDescription: string,
    done: boolean
}

const TaskCard = (props: TaskCardProps) => {
    const maskedId = props.id.substring(5)

    const toggleDone = () => {
        toggleTaskAPI(props.id, (res) => [
            DbAddTask(res)
        ])
    }

    const deleteTask = () => {
        deleteTaskAPI(props.id, (res) => [
            DbRemoveTask(res)
        ])
    }

    return (
        <div className={taskCardContainer}>
            <p>{props.done ? '✅' : '▶️'} {maskedId}</p>
            <div style={{height: 15}} />
            <p className={textStyles.boldparagraph}>{props.taskName}</p>
            <div style={{height: 4}} />
            <p>{props.taskDescription}</p>
            <div style={{height: 16}} />
            <label>
                <BaseButton
                    text={props.done ? 'uncheck' : 'check'}
                    onClick={toggleDone}
                    style={{background: '#58CE74'}}
                    />
                <BaseButton
                    text='delete'
                    onClick={deleteTask}
                    style={{background: '#FF1168'}}
                />
            </label>
        </div>
    )
}

const taskCardContainer = css`
    padding: 24px;
    background-color: azure;
    display: flex;
    flex-direction: column;
    margin: 0 0 8px 0;

    label {
        display: flex;
    }
`