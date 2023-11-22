'use client'
import { Button, Callout, CalloutText, TextField } from '@radix-ui/themes';
// import SimpleMDE from "react-simplemde-editor";
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema> //this is how we grenerate interface base of our schema 

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const route = useRouter()
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({ resolver: zodResolver(issueSchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true)
      if (issue)
        await axios.patch('/api/issues/' + issue.id, data)
      else
        await axios.post('/api/issues', data)
      route.push('/issues/list')
    } catch (error) {
      setSubmitting(false)
      setError('An unexpected error has occured.')
    }
  })

  return (
    <div className='max-w-xl'>

      {error && (<Callout.Root color='red' className='mb-5'>
        <CalloutText >{error}</CalloutText>
      </Callout.Root>)}

      <form className=' space-y-3' onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage >{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />
        <ErrorMessage >{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit new issue'}{''} {isSubmitting && <Spinner />}
        </Button>
      </form>

    </div>
  )
}

export default IssueForm