import { DeleteOutline } from "@mui/icons-material"
import { Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material"


export const DepartmentCard = ({department, handleDelete}) => {
    return(
        <div>
            <Card elevation={1}>
                <CardHeader
                action={
                    <IconButton onClick={() => handleDelete(department.DepartmentId)}>
                        <DeleteOutline />
                    </IconButton>
                }
                title={department.DepartmentName}
                subheader={department.DepartmentId}
                />
                <CardContent>
                    <Typography variant="body2">
                        {department.DepartmentName}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}