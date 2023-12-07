import os

from flask import Blueprint, g, redirect, request, send_from_directory, url_for
from flask_cors import CORS
from flask_uploads import ALL, UploadSet
from sqlalchemy import update

from bdd import Session
from middlewares import auth
from models.Link import Link
from models.Task import Task

task = Blueprint('task', __name__)
session = Session()

CORS(task, supports_credentials=True)

BASE_URL = '/api/garden/<garden_id>/plot/<plot_id>/tasks'


@task.before_request
def before_request():
    try:
        user = auth.authenticate(request)
        g.user = user
    except Exception as e:
        return {'message': str(e)}, 500


@task.get(BASE_URL + '/')
def get_tasks(garden_id, plot_id):
    try:

        link = session.query(Link).filter_by(
            garden_id=garden_id, account_id=g.user.id).first()
        if not link:
            return {'message': 'You are not in this garden'}, 403

        tasks = session.query(Task).filter_by(plot_id=plot_id).all()
        return tasks_to_json(tasks)

    except Exception as e:
        return {'message': str(e)}, 500


def tasks_to_json(tasks):
    return [task_to_json(task) for task in tasks]


def task_to_json(task):
    return {
        'id': task.task_id,
        'title': task.task_name,
        'description': task.task_description,
    }


@task.post(BASE_URL + '/')
def create_task(garden_id, plot_id):

    try:

        link = session.query(Link).filter_by(
            garden_id=garden_id, account_id=g.user.id).first()
        if not link:
            return {'message': 'You are not in this garden'}, 403

        body = request.get_json()
        task_name = body['title']
        task_description = body['description']

        if not task_name:
            return {'message': 'Missing task name'}, 400

        task = Task(plot_id=plot_id, task_name=task_name,
                    task_description=task_description)
        session.add(task)
        session.commit()

        return {'message': 'Task created'}, 200

    except Exception as e:
        return {'message': str(e)}, 500


@task.delete(BASE_URL + '/<task_id>')
def delete_task(garden_id, plot_id, task_id):
    try:
        link = session.query(Link).filter_by(
            garden_id=garden_id, account_id=g.user.id).first()
        if not link:
            return {'message': 'You are not in this garden'}, 403

        task = session.query(Task).filter_by(task_id=task_id).first()

        if not task:
            return {'message': 'Task not found'}, 404

        session.delete(task)
        session.commit()
        return {'message': 'Task deleted'}, 200
    except Exception as e:
        return {'message': str(e)}, 500
