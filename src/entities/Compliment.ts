import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Tag } from './Tag'
import { User } from './User'

@Entity('compliments')
export class Compliment {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  /**
   * User sender relationship
   */
  @Column()
  user_sender: string

  @JoinColumn({ name: 'user_sender' })
  @ManyToOne(() => User)
  userSender: User

  /**
   * User receiver relationship
   */
  @Column()
  user_receiver: string

  @JoinColumn({ name: 'user_receiver' })
  @ManyToOne(() => User)
  userReceiver: User

  /**
   * Tag Retationship
   */
  @Column()
  tag_id: string

  @JoinColumn({ name: 'tag_id' })
  @ManyToOne(() => Tag)
  tag: Tag

  @Column()
  message: string

  @CreateDateColumn()
  created_at: Date

  public constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
