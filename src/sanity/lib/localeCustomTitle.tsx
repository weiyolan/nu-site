import {FieldProps  } from "sanity";
import {Stack, Text, Card} from '@sanity/ui'

function CustomTitle(props:FieldProps) {
  const {description, title, ...restProps} = props
  return (
    <Card  >
      <Stack space={3} marginBottom={3}>
        {/* <Text size={1} weight="bold" >
          {title}
        </Text> */}
        {title && (
          <Text size={1} style={{color: 'var(--card-muted-fg-color)'}} >
            {title}
          </Text>
        )}
      </Stack>
      {props.renderDefault(restProps)}
    </Card>
  )
}
export default CustomTitle

export function CustomBlockTitle(props:FieldProps) {
  const {title, name, ...restProps} = props
  return (
    <Card>
      {/* style={{visibility: 'hidden'}}  */}
       {title && (
          <Text size={1} style={{color:'red'}} >
            {title + ' HEY'} 
          </Text>
        )}
      {props.renderDefault(restProps)}
    </Card>
  )
}
