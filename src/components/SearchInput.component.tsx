import { TextField, IconButton, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { FC } from 'react';

interface ISearchInputComponentProps {
    searchValue: string
    onChangeSearchValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClearSearch: () => void;
}

export const SearchInputComponent: FC<ISearchInputComponentProps> = (props) => {
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChangeSearchValue(event)
    }

    const handleClearSearch = () => {
        props.onClearSearch()
    }

    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscardor..."
            value={props.searchValue}
            onChange={handleSearchChange}
            size="small"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon color="action" />
                    </InputAdornment>
                ),
                endAdornment: props.searchValue && (
                    <InputAdornment position="end">
                        <IconButton onClick={handleClearSearch} edge="end" size="small">
                            <CloseIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}