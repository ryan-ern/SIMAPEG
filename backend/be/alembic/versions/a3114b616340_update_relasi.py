"""update relasi

Revision ID: a3114b616340
Revises: 
Create Date: 2024-03-21 06:53:32.626773

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a3114b616340'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('models',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Text(), nullable=True),
    sa.Column('value', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_models'))
    )
    op.create_index('my_index', 'models', ['name'], unique=True, mysql_length=255)
    op.create_table('position',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('salary_in_months', sa.Float(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_position'))
    )
    op.create_table('work',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('total_days', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_work'))
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=255), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('avatar', sa.String(length=255), nullable=False),
    sa.Column('jatah_cuti', sa.Integer(), nullable=False),
    sa.Column('nik', sa.BigInteger(), nullable=False),
    sa.Column('nohp', sa.String(length=255), nullable=False),
    sa.Column('jk_pegawai', sa.String(length=255), nullable=False),
    sa.Column('tgl_lahir', sa.Date(), nullable=False),
    sa.Column('status', sa.String(length=255), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('role', sa.Enum('admin', 'user'), nullable=False),
    sa.Column('total_work_id', sa.Integer(), nullable=False),
    sa.Column('jabatan_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['jabatan_id'], ['position.id'], name=op.f('fk_users_jabatan_id_position')),
    sa.ForeignKeyConstraint(['total_work_id'], ['work.id'], name=op.f('fk_users_total_work_id_work')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_users')),
    sa.UniqueConstraint('username', name=op.f('uq_users_username'))
    )
    op.create_table('leave',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('awal', sa.DateTime(), nullable=False),
    sa.Column('akhir', sa.DateTime(), nullable=False),
    sa.Column('status', sa.Enum('diproses', 'ditolak', 'diterima'), nullable=False),
    sa.Column('desc', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_leave_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_leave'))
    )
    op.create_table('presence',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('presence_in', sa.DateTime(), nullable=False),
    sa.Column('presence_out', sa.DateTime(), nullable=False),
    sa.Column('status', sa.Enum('diproses', 'ditolak', 'diterima', 'telat'), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_presence_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_presence'))
    )
    op.create_table('salary',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('total_presence', sa.Integer(), nullable=False),
    sa.Column('total_work_id', sa.Integer(), nullable=False),
    sa.Column('position_id', sa.Integer(), nullable=False),
    sa.Column('total_salary', sa.Float(), nullable=False),
    sa.Column('month', sa.Integer(), nullable=False),
    sa.Column('year', sa.Integer(), nullable=False),
    sa.Column('status', sa.Enum('diambil', 'belum diambil'), nullable=False),
    sa.ForeignKeyConstraint(['position_id'], ['position.id'], name=op.f('fk_salary_position_id_position')),
    sa.ForeignKeyConstraint(['total_work_id'], ['work.id'], name=op.f('fk_salary_total_work_id_work')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_salary_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_salary'))
    )
    op.create_table('tokens',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('jwt_token', sa.Text(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_tokens_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_tokens'))
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tokens')
    op.drop_table('salary')
    op.drop_table('presence')
    op.drop_table('leave')
    op.drop_table('users')
    op.drop_table('work')
    op.drop_table('position')
    op.drop_index('my_index', table_name='models', mysql_length=255)
    op.drop_table('models')
    # ### end Alembic commands ###
