using AutoMapper;
using CleanerProducts.Api.DTOs.Category;
using CleanerProducts.Api.DTOs.Product;
using CleanerProducts.Api.DTOs.User;
using CleanerProducts.Api.Models;

namespace CleanerProducts.Api.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<User, UserOutputDTO>();
            CreateMap<UserInputDTO, User>()
                .ForMember(dest=> dest.UserType, opt=>opt.MapFrom(src=> Enum.Parse<UserType>(src.UserType, true)));
            CreateMap<ProductInputDto, Product>();
            CreateMap<Product, ProductOutputDto>();
            CreateMap<CategoryInputDto, Category>();
            CreateMap<Category, CategoryOutputDto>();
        }
    }
}
